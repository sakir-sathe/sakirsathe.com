import { execFileSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const HOST = "sakirsathe.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const KEY = "b818cf36f2594f22b16957d801faa9b2";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ARTICLE_PATH = /^content\/writing\/(en|es|hi)\/([^/]+)\.mdx$/;
const LEGACY_ROOT_ARTICLE_PATH = /^content\/writing\/([^/]+)\.mdx$/;
const MAX_ATTEMPTS = 3;
const MAX_RETRY_WAIT_MS = 15_000;

function runGit(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch {
    throw new Error(`git ${args[0]} failed`);
  }
}

function isValidSha(value) {
  return typeof value === "string" && /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(value);
}

function isZeroSha(value) {
  return typeof value === "string" && /^0+$/.test(value);
}

function verifyCommit(sha, name) {
  if (!isValidSha(sha)) throw new Error(`${name} is not a valid Git SHA`);
  runGit(["cat-file", "-e", `${sha}^{commit}`]);
}

export function parseWritingArticlePath(value, { allowLegacyRoot = false } = {}) {
  if (typeof value !== "string") return undefined;
  const match = ARTICLE_PATH.exec(value);
  if (match && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(match[2] ?? "")) return { locale: match[1], slug: match[2], legacyRoot: false };
  if (allowLegacyRoot) {
    const legacyMatch = LEGACY_ROOT_ARTICLE_PATH.exec(value);
    if (legacyMatch && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(legacyMatch[1] ?? "")) return { locale: "en", slug: legacyMatch[1], legacyRoot: true };
  }
  return undefined;
}

export function isWritingArticlePath(value) {
  return parseWritingArticlePath(value) !== undefined;
}

export function parseNameStatus(output) {
  const fields = output.split("\0");
  const rawChanges = [];
  let cursor = 0;

  while (cursor < fields.length - 1) {
    const status = fields[cursor++];
    if (!status) continue;

    let oldPath;
    let newPath;
    if (status.startsWith("R") || status.startsWith("C")) {
      oldPath = fields[cursor++];
      newPath = fields[cursor++];
    } else {
      const filePath = fields[cursor++];
      oldPath = status.startsWith("A") ? null : filePath;
      newPath = status.startsWith("D") ? null : filePath;
    }

    rawChanges.push({ oldPath, newPath });
  }

  const enAdds = new Map();
  for (const [index, change] of rawChanges.entries()) {
    const identity = parseWritingArticlePath(change.newPath);
    if (change.oldPath === null && identity?.locale === "en") enAdds.set(identity.slug, index);
  }

  const changes = [];
  const consumedAdds = new Set();
  for (const change of rawChanges) {
    const oldIdentity = parseWritingArticlePath(change.oldPath, { allowLegacyRoot: true });
    const newIdentity = parseWritingArticlePath(change.newPath);

    if (oldIdentity?.legacyRoot) {
      if (newIdentity?.locale === "en" && newIdentity.slug === oldIdentity.slug) {
        changes.push({ oldPath: change.oldPath, newPath: change.newPath });
        continue;
      }
      if (change.newPath === null) {
        const addIndex = enAdds.get(oldIdentity.slug);
        if (addIndex !== undefined) {
          consumedAdds.add(addIndex);
          changes.push({ oldPath: change.oldPath, newPath: rawChanges[addIndex]?.newPath ?? null });
        }
      }
      continue;
    }

    const awaitingLegacyPair = change.oldPath === null && newIdentity?.locale === "en";
    if (oldIdentity || (newIdentity && !awaitingLegacyPair)) changes.push(change);
  }

  for (const [index, change] of rawChanges.entries()) {
    const newIdentity = parseWritingArticlePath(change.newPath);
    if (change.oldPath === null && newIdentity?.locale === "en" && !consumedAdds.has(index)) changes.push(change);
  }
  return changes;
}

function parseArticleSource(source, identity) {
  const match = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(source);
  if (!match) throw new Error("Changed Writing article has invalid frontmatter");

  const frontmatterLines = (match[1] ?? "").split(/\r?\n/);
  const publishedLines = frontmatterLines.filter((line) => /^\s*published\s*:/i.test(line));
  if (publishedLines.length !== 1) throw new Error("Changed Writing article has ambiguous published state");

  const localeLines = frontmatterLines.filter((line) => /^\s*locale\s*:/i.test(line));
  if (identity.legacyRoot) {
    if (localeLines.length > 1 || (localeLines.length === 1 && !/^\s*locale\s*:\s*en\s*(?:#.*)?$/i.test(localeLines[0] ?? ""))) {
      throw new Error("Legacy root Writing source has an invalid locale");
    }
  } else if (localeLines.length !== 1 || !new RegExp(`^\\s*locale\\s*:\\s*${identity.locale}\\s*(?:#.*)?$`, "i").test(localeLines[0] ?? "")) {
    throw new Error("Writing source locale does not match its folder");
  }

  const publishedMatch = /^\s*published\s*:\s*(true|false)\s*(?:#.*)?$/i.exec(publishedLines[0] ?? "");
  if (!publishedMatch) throw new Error("Changed Writing article has invalid published state");

  const publicFrontmatter = frontmatterLines
    .filter((line) => line.trim() && !/^\s*#/.test(line) && !/^\s*(published|featured|locale|translationKey|translationSourceHash)\s*:/i.test(line))
    .map((line) => line.trimEnd())
    .join("\n");
  const body = source.slice(match[0].length).replace(/\r\n/g, "\n").trim();

  return {
    published: publishedMatch[1]?.toLowerCase() === "true",
    fingerprint: `${publicFrontmatter}\n---\n${body}`,
  };
}

export function articleUrl(identity) {
  if (!identity || !["en", "es", "hi"].includes(identity.locale) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(identity.slug)) {
    throw new Error("Cannot derive a public URL from an invalid Writing identity");
  }
  const prefix = identity.locale === "en" ? "" : `/${identity.locale}`;
  return `${ORIGIN}${prefix}/writing/${encodeURIComponent(identity.slug)}`;
}

export function articleUrlsForChange({ oldPath, newPath, oldSource, newSource }) {
  const oldIdentity = parseWritingArticlePath(oldPath, { allowLegacyRoot: true });
  const newIdentity = parseWritingArticlePath(newPath);
  const hasOld = Boolean(oldIdentity);
  const hasNew = Boolean(newIdentity);
  if (!hasOld && !hasNew) return [];

  const oldArticle = hasOld ? parseArticleSource(oldSource ?? "", oldIdentity) : null;
  const newArticle = hasNew ? parseArticleSource(newSource ?? "", newIdentity) : null;
  const urls = new Set();

  if (hasOld && hasNew && oldPath !== newPath) {
    if (oldArticle?.published) urls.add(articleUrl(oldIdentity));
    if (newArticle?.published) urls.add(articleUrl(newIdentity));
  } else if (!oldArticle?.published && newArticle?.published) {
    urls.add(articleUrl(newIdentity));
  } else if (oldArticle?.published && !newArticle?.published) {
    urls.add(articleUrl(oldIdentity));
  } else if (
    oldArticle?.published &&
    newArticle?.published &&
    oldArticle.fingerprint !== newArticle.fingerprint
  ) {
    urls.add(articleUrl(newIdentity));
  }

  return [...urls];
}

export function buildUrlList(changes) {
  const articleUrls = new Set();
  for (const change of changes) {
    for (const url of articleUrlsForChange(change)) articleUrls.add(url);
  }
  if (articleUrls.size === 0) return [];
  const locales = new Set([...articleUrls].map((url) => url.startsWith(`${ORIGIN}/es/`) ? "es" : url.startsWith(`${ORIGIN}/hi/`) ? "hi" : "en"));
  for (const locale of locales) articleUrls.add(`${ORIGIN}${locale === "en" ? "" : `/${locale}`}/writing`);
  if (locales.has("en")) articleUrls.add(ORIGIN);
  return [...articleUrls];
}

function changedPaths(beforeSha, afterSha) {
  if (isZeroSha(beforeSha)) {
    return runGit(["ls-tree", "-r", "--name-only", "-z", afterSha, "--", "content/writing"])
      .split("\0")
      .filter((path) => isWritingArticlePath(path))
      .map((newPath) => ({ oldPath: null, newPath }));
  }

  const diff = runGit([
    "diff",
    "--name-status",
    "-z",
    "--find-renames",
    beforeSha,
    afterSha,
    "--",
    "content/writing",
  ]);
  return parseNameStatus(diff);
}

function readArticleAt(sha, filePath) {
  if (!parseWritingArticlePath(filePath, { allowLegacyRoot: true })) throw new Error("Refusing to read a non-Writing path");
  return runGit(["show", `${sha}:${filePath}`]);
}

function retryDelay(response, attempt) {
  const retryAfter = response?.headers.get("retry-after");
  if (retryAfter) {
    const seconds = Number(retryAfter);
    const parsedDate = Date.parse(retryAfter);
    const requested = Number.isFinite(seconds) ? seconds * 1000 : parsedDate - Date.now();
    if (Number.isFinite(requested)) return Math.min(MAX_RETRY_WAIT_MS, Math.max(0, requested));
  }
  return Math.min(MAX_RETRY_WAIT_MS, 1000 * (2 ** (attempt - 1)));
}

async function submitUrls(urlList) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  });

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let response;
    try {
      response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: payload,
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      if (attempt === MAX_ATTEMPTS) throw new Error(`IndexNow network request failed after ${MAX_ATTEMPTS} attempts`);
      await delay(retryDelay(null, attempt));
      continue;
    }

    if (response.status === 200) {
      console.log(`IndexNow accepted ${urlList.length} URL(s) (HTTP 200)`);
      return;
    }
    if (response.status === 202) {
      console.log(`IndexNow accepted ${urlList.length} URL(s); key validation is pending (HTTP 202)`);
      return;
    }

    if (response.status === 429 || response.status >= 500) {
      if (attempt < MAX_ATTEMPTS) {
        await delay(retryDelay(response, attempt));
        continue;
      }
    }

    throw new Error(`IndexNow request failed with HTTP ${response.status}`);
  }
}

async function main() {
  const beforeSha = process.env.INDEXNOW_BEFORE_SHA;
  const afterSha = process.env.INDEXNOW_AFTER_SHA;
  if (!isValidSha(afterSha)) throw new Error("INDEXNOW_AFTER_SHA is missing or invalid");
  verifyCommit(afterSha, "INDEXNOW_AFTER_SHA");

  if (!isZeroSha(beforeSha)) verifyCommit(beforeSha, "INDEXNOW_BEFORE_SHA");
  else if (!isValidSha(beforeSha)) throw new Error("INDEXNOW_BEFORE_SHA is missing or invalid");

  const changes = changedPaths(beforeSha, afterSha).map(({ oldPath, newPath }) => ({
    oldPath,
    newPath,
    oldSource: oldPath && !isZeroSha(beforeSha) ? readArticleAt(beforeSha, oldPath) : null,
    newSource: newPath ? readArticleAt(afterSha, newPath) : null,
  }));
  const urlList = buildUrlList(changes);

  if (urlList.length === 0) {
    console.log("No meaningful published Writing changes; IndexNow request skipped");
    return;
  }

  if (process.env.INDEXNOW_DRY_RUN === "1") {
    console.log("INDEXNOW_DRY_RUN=1; URLs that would be submitted:");
    for (const url of urlList) console.log(url);
    return;
  }

  await submitUrls(urlList);
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (import.meta.url === invokedPath) {
  main().catch((error) => {
    const message = error instanceof Error ? error.message.replace(/[\r\n]/g, " ") : "unknown error";
    console.error(`IndexNow notification failed: ${message}`);
    console.log(`::warning::IndexNow notification failed: ${message}. The production deployment succeeded; this notification is non-blocking.`);
    process.exitCode = 1;
  });
}
