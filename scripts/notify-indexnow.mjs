import { execFileSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const HOST = "sakirsathe.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const KEY = "b818cf36f2594f22b16957d801faa9b2";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ARTICLE_PATH = /^content\/writing\/[^/]+\.mdx$/;
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

export function isWritingArticlePath(value) {
  return typeof value === "string" && ARTICLE_PATH.test(value);
}

export function parseNameStatus(output) {
  const fields = output.split("\0");
  const changes = [];
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

    if (isWritingArticlePath(oldPath) || isWritingArticlePath(newPath)) {
      changes.push({ oldPath, newPath });
    }
  }

  return changes;
}

function parseArticleSource(source) {
  const match = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(source);
  if (!match) throw new Error("Changed Writing article has invalid frontmatter");

  const frontmatterLines = (match[1] ?? "").split(/\r?\n/);
  const publishedLines = frontmatterLines.filter((line) => /^\s*published\s*:/i.test(line));
  if (publishedLines.length !== 1) throw new Error("Changed Writing article has ambiguous published state");

  const publishedMatch = /^\s*published\s*:\s*(true|false)\s*(?:#.*)?$/i.exec(publishedLines[0] ?? "");
  if (!publishedMatch) throw new Error("Changed Writing article has invalid published state");

  const publicFrontmatter = frontmatterLines
    .filter((line) => line.trim() && !/^\s*#/.test(line) && !/^\s*(published|featured)\s*:/i.test(line))
    .map((line) => line.trimEnd())
    .join("\n");
  const body = source.slice(match[0].length).replace(/\r\n/g, "\n").trim();

  return {
    published: publishedMatch[1]?.toLowerCase() === "true",
    fingerprint: `${publicFrontmatter}\n---\n${body}`,
  };
}

function articleUrl(filePath) {
  const slug = filePath.slice("content/writing/".length, -".mdx".length);
  return `${ORIGIN}/writing/${encodeURIComponent(slug)}`;
}

export function articleUrlsForChange({ oldPath, newPath, oldSource, newSource }) {
  const hasOld = isWritingArticlePath(oldPath);
  const hasNew = isWritingArticlePath(newPath);
  if (!hasOld && !hasNew) return [];

  const oldArticle = hasOld ? parseArticleSource(oldSource ?? "") : null;
  const newArticle = hasNew ? parseArticleSource(newSource ?? "") : null;
  const urls = new Set();

  if (hasOld && hasNew && oldPath !== newPath) {
    if (oldArticle?.published) urls.add(articleUrl(oldPath));
    if (newArticle?.published) urls.add(articleUrl(newPath));
  } else if (!oldArticle?.published && newArticle?.published) {
    urls.add(articleUrl(newPath));
  } else if (oldArticle?.published && !newArticle?.published) {
    urls.add(articleUrl(oldPath));
  } else if (
    oldArticle?.published &&
    newArticle?.published &&
    oldArticle.fingerprint !== newArticle.fingerprint
  ) {
    urls.add(articleUrl(newPath));
  }

  return [...urls];
}

export function buildUrlList(changes) {
  const articleUrls = new Set();
  for (const change of changes) {
    for (const url of articleUrlsForChange(change)) articleUrls.add(url);
  }
  if (articleUrls.size === 0) return [];
  articleUrls.add(`${ORIGIN}/writing`);
  articleUrls.add(ORIGIN);
  return [...articleUrls];
}

function changedPaths(beforeSha, afterSha) {
  if (isZeroSha(beforeSha)) {
    return runGit(["ls-tree", "-r", "--name-only", "-z", afterSha, "--", "content/writing"])
      .split("\0")
      .filter(isWritingArticlePath)
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
  if (!isWritingArticlePath(filePath)) throw new Error("Refusing to read a non-Writing path");
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
