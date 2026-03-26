import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, DM_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "IntentRadar — Multi-platform Intelligence Reconnaissance",
    template: "%s | IntentRadar"
  },
  description: "Next-generation intent intelligence engine. Turn any keyword into a multi-platform tactical reconnaissance report. 30 days of signal from Reddit, X, YouTube, HN, and Polymarket.",
  metadataBase: new URL("https://intentradar.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intentradar.ai",
    siteName: "IntentRadar",
    title: "IntentRadar | Strategic Intent Intelligence",
    description: "Multi-stream reconnaissance for high-growth tactical teams.",
    images: ["/og-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "IntentRadar | Intelligence Engine",
    description: "Cross-stream intent scoring and buyer stage detection.",
    images: ["/og-image.png"],
    creator: "@intentradar"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${dmMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary selection:bg-signal selection:text-background">
        {children}
      </body>
    </html>
  );
}
