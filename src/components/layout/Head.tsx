import NextHead from "next/head";
import React from "react";
interface Props {
  title?: string;
  description?: string;
  keyword?: string;
  canonicalUrl?: string;
  image?: string;
}

export function Head({
  title,
  description,
  keyword,
  canonicalUrl,
  image,
}: Props): JSX.Element {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta name="robots" content={"index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph (OG) Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" href="" />
      <link rel="icon" type="image/png" sizes="96x96" href=""></link>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
    </NextHead>
  );
}
