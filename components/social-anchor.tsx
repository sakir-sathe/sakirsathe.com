import type { AnchorHTMLAttributes } from "react";

/** Unknown profiles are deliberately not links or keyboard stops. */
export function SocialAnchor({ href, children, className, title, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return (
      <span className={`social-unconfigured ${className ?? ""}`} title={title}>
        {children}<span className="profile-placeholder">Not configured</span>
      </span>
    );
  }
  return <a href={href} className={className} title={title} {...props}>{children}</a>;
}
