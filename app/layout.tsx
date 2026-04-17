import type { Metadata } from "next";
import "./globals.css";
import { rootMetadata } from "./seo";
import { ScrollToTop } from "@/components/scroll-to-top";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          src="https://phospho-nanocorp-prod--nanocorp-api-fastapi-app.modal.run/beacon/snippet.js?s=dashclub"
          defer
        />
      </head>
      <body className="antialiased">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
