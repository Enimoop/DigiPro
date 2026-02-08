import classNames from "classnames";
import React from "react";
import { Nav } from "react-bootstrap";


/* ---------------- Header root ---------------- */

type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("header", className)}
        {...props}
      />
    );
  }
);
Header.displayName = "Header";

/* ---------------- Header.Body ---------------- */

type BlockProps = React.HTMLAttributes<HTMLDivElement>;

const Body = React.forwardRef<HTMLDivElement, BlockProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames("header-body", className)}
      {...props}
    />
  )
);
Body.displayName = "Header.Body";

/* ---------------- Header.Footer ---------------- */

const Footer = React.forwardRef<HTMLDivElement, BlockProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames("header-footer", className)}
      {...props}
    />
  )
);
Footer.displayName = "Header.Footer";

/* ---------------- Header.Title ---------------- */

type TitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={classNames("header-title", className)}
      {...props}
    />
  )
);
Title.displayName = "Header.Title";

/* ---------------- Header.Subtitle ---------------- */

type SubtitleProps = React.HTMLAttributes<HTMLParagraphElement>;

const Subtitle = React.forwardRef<HTMLParagraphElement, SubtitleProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={classNames("header-subtitle", className)}
      {...props}
    />
  )
);
Subtitle.displayName = "Header.Subtitle";

/* ---------------- Header.Pretitle ---------------- */

const Pretitle = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, ...props }, ref) => (
    <h6
      ref={ref}
      className={classNames("header-pretitle", className)}
      {...props}
    />
  )
);
Pretitle.displayName = "Header.Pretitle";

/* ---------------- Header.Tabs ---------------- */

const Tabs = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Nav>>(
  ({ className, ...props }, ref) => (
    <Nav
      ref={ref}
      variant="tabs"
      className={classNames("header-tabs", className)}
      {...props}
    />
  )
);
Tabs.displayName = "Header.Tabs";



/* ---------------- Export with subcomponents ---------------- */

export default Object.assign(Header, {
  Body,
  Footer,
  Title,
  Subtitle,
  Pretitle,
  Tabs,
});
