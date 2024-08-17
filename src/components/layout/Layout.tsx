import React, { ReactNode } from "react";
import { Head } from "./Head";
import Header from "./Header";

interface LayoutProps {
  title?: string;
  description?: string;
  keyword?: string;
  children?: ReactNode;
  canonicalUrl?: string;
  image?: string;
}

export function Layout({
  children,
  title,
  description,
  keyword,
  canonicalUrl,
  image,
}: LayoutProps): JSX.Element {
  return (
    <>
      <Head
        title={title}
        description={description}
        keyword={keyword}
        canonicalUrl={canonicalUrl}
        image={image}
      />
      <Header />
      <main>{children}</main>
    </>
  );
}
