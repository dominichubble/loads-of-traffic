"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useTransitionNavigate } from "./use-transition-navigate";

type TransitionLinkPropsType = {
  children?: React.ReactNode;
  href: string;
  className?: string;
} & ComponentPropsWithoutRef<typeof Link>;

const TransitionLink = ({
  children,
  href,
  className,
  onClick,
  ...props
}: TransitionLinkPropsType) => {
  const pathname = usePathname();
  const navigate = useTransitionNavigate();

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    const destinationPath = href.split("#")[0] || pathname;
    if (destinationPath === pathname) return;

    event.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} className={className} onClick={handleLinkClick} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
