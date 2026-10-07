import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Script from "next/script";

type NewsletterSignupProps = {
  heading: string;
  description: string;
  compact?: boolean;
  className?: string;
};

export function NewsletterSignup({ heading, description, compact = false, className }: NewsletterSignupProps) {
  return (
    <section aria-labelledby="newsletter-signup-heading" className={cn("w-full min-w-0", compact ? "border-t border-line pt-6" : "border-y border-line bg-sunken/40 py-6", className)}>
      <div className={cn("grid min-w-0 gap-5", !compact && "md:grid-cols-[minmax(0,1fr)_minmax(0,540px)] md:items-center")}>
        <div className={cn(!compact && "max-w-md")}>
          <h2 id="newsletter-signup-heading" className={compact ? "text-[16px] font-medium tracking-tight" : "text-[18px] font-medium tracking-tight"}>{heading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        </div>
        <div id="sib-form-container" className="w-full min-w-0 max-w-[540px] justify-self-center md:justify-self-end">
          <div
            id="error-message"
            role="alert"
            aria-live="assertive"
            className="sib-form-message-panel text-sm leading-relaxed text-red-700 dark:text-red-300 [&:not(.sib-form-message-panel--active)]:hidden"
          >
            <p className="sib-form-message-panel__inner-text">Your subscription could not be saved. Please try again.</p>
          </div>
          <div
            id="success-message"
            role="status"
            aria-live="polite"
            className="sib-form-message-panel text-sm leading-relaxed text-muted [&:not(.sib-form-message-panel--active)]:hidden"
          >
            <p className="sib-form-message-panel__inner-text">Thanks for subscribing! You&apos;ll receive new articles and updates from Sakir Sathe Writing.</p>
          </div>
          <div id="sib-container" className="w-full min-w-0">
            <form
              id="sib-form"
              method="POST"
              action="https://7d60b2a9.sibforms.com/serve/MUIFAElqzY43XvSm7ZLB9IwzzAiIwfes-oVJ3x8WYRbo9-Dr-1NpRRNCtzfYk7XgYwgrVC_lJXuEvjfuHypg2jaa29moLIimaaEaf0Cy9Jm5UARuASt1a4vl5_-gpNFvcHPvxQy34vXqm9sAeVAB0KOVXFBb3Hg3Oir_uA9-kNBlCz-TdXKx0ZXP0yAuaeOaqMCQUKPPv1zZ56Ki"
              data-type="subscription"
              className="w-full"
            >
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
                <div className="sib-input min-w-0 flex-1">
                  <div className="form__entry">
                    <label htmlFor="EMAIL" className="sr-only">Email address</label>
                    <input
                      className="input min-h-11 w-full min-w-0 rounded-sm border border-line bg-raised px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle focus-visible:border-accent"
                      type="email"
                      id="EMAIL"
                      name="EMAIL"
                      autoComplete="email"
                      placeholder="email@example.com"
                      required
                      data-required="true"
                      aria-describedby="newsletter-email-error"
                    />
                    <div
                      id="newsletter-email-error"
                      className="entry__error entry__error--primary mt-2 text-sm text-red-700 dark:text-red-300"
                      role="alert"
                      aria-live="assertive"
                    />
                    <div className="entry__error entry__error--secondary" aria-hidden="true" />
                  </div>
                </div>
                <div className="relative inline-flex min-h-11 min-w-[112px] shrink-0 items-center justify-center">
                  <button
                    type="submit"
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-fg bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:border-accent hover:bg-accent hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70"
                  >
                    Subscribe
                  </button>
                  <span className="sib-loader absolute inset-0 flex items-center justify-center" style={{ display: "none" }} aria-hidden="true">
                    <LoaderCircle className="size-5 animate-spin text-accent" />
                  </span>
                </div>
              </div>
              <input
                type="text"
                name="email_address_check"
                value=""
                className="input-hidden sr-only"
                hidden
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
              />
              <input type="hidden" name="locale" value="en" />
            </form>
          </div>
        </div>
      </div>
      <Script id="brevo-form-config" strategy="afterInteractive">
        {`window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
window.LOCALE = 'en';
window.EMAIL_INVALID_MESSAGE = 'The information provided is invalid. Please review the field format and try again.';
window.SMS_INVALID_MESSAGE = 'The information provided is invalid. Please review the field format and try again.';
window.REQUIRED_ERROR_MESSAGE = 'This field cannot be left blank.';
window.GENERIC_INVALID_MESSAGE = 'The information provided is invalid. Please review the field format and try again.';
window.INVALID_NUMBER = 'The information provided is invalid. Please review the field format and try again.';
window.INVALID_DATE = 'Please enter a valid date';
window.REQUIRED_MULTISELECT_MESSAGE = 'Please select at least 1 option';
window.translation = { common: { selectedList: '{quantity} list selected', selectedLists: '{quantity} lists selected', selectedOption: '{quantity} selected', selectedOptions: '{quantity} selected' } };
window.AUTOHIDE = true;

const form = document.querySelector('#sib-form');
const email = document.querySelector('#EMAIL');
const fieldError = document.querySelector('#newsletter-email-error');
const successText = document.querySelector('#success-message .sib-form-message-panel__inner-text');
const errorText = document.querySelector('#error-message .sib-form-message-panel__inner-text');
const successPanel = document.querySelector('#success-message');
const errorPanel = document.querySelector('#error-message');
const successMessage = "Thanks for subscribing! You'll receive new articles and updates from Sakir Sathe Writing.";
const errorMessage = 'Your subscription could not be saved. Please try again.';

if (form && email && fieldError) {
  form.addEventListener('submit', (event) => {
    const message = !email.value.trim()
      ? 'Please enter your email address.'
      : !email.validity.valid
        ? 'Please enter a valid email address.'
        : '';
    if (!message) {
      fieldError.textContent = '';
      fieldError.style.display = 'none';
      email.removeAttribute('aria-invalid');
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    fieldError.textContent = message;
    fieldError.style.display = 'block';
    email.setAttribute('aria-invalid', 'true');
  });
  email.addEventListener('input', () => {
    if (email.value.trim() && email.validity.valid) {
      fieldError.textContent = '';
      fieldError.style.display = 'none';
      email.removeAttribute('aria-invalid');
    }
  });
}

const messageObserver = new MutationObserver(() => {
  if (successPanel?.classList.contains('sib-form-message-panel--active') && successText?.textContent !== successMessage) successText.textContent = successMessage;
  if (errorPanel?.classList.contains('sib-form-message-panel--active') && errorText?.textContent !== errorMessage) errorText.textContent = errorMessage;
});
if (successPanel && errorPanel) {
  messageObserver.observe(successPanel, { attributes: true, childList: true, characterData: true, subtree: true });
  messageObserver.observe(errorPanel, { attributes: true, childList: true, characterData: true, subtree: true });
}`}
      </Script>
      <Script src="https://sibforms.com/forms/end-form/build/main.js" strategy="lazyOnload" />
    </section>
  );
}