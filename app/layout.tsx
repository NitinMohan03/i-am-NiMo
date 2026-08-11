import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionLayer } from "@/components/MotionLayer";
import { profile } from "@/data/profile";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Nitin Mohan — Software Engineer specializing in GenAI/RAG, cloud, and fast React frontends. Ask the AI chat box anything about my experience and projects.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nitinmohan.dev"),
  title: `${profile.name} — ${profile.title}`,
  description,
  keywords: [
    "Nitin Mohan",
    "Software Engineer",
    "GenAI",
    "RAG",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description,
    type: "website",
    siteName: `${profile.name} · Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#151a22",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // The bootstrap below stamps `pre-reveal` on <html> before hydration.
      suppressHydrationWarning
      className={`${dmSans.variable} ${bricolage.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          // Hides reveal targets before first paint (skipped under reduced
          // motion) and self-clears after 3s if MotionLayer never mounts.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('pre-reveal');setTimeout(function(){d.classList.remove('pre-reveal')},3000)}catch(e){}})()",
          }}
        />
      </head>
      <body className="min-h-screen bg-ground font-sans text-ink antialiased">
        <MotionLayer />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-coral focus:px-4 focus:py-2 focus:text-sm focus:text-ground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
