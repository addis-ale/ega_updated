import type { Metadata } from "next";
import { Inknut_Antiqua } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const inknut = Inknut_Antiqua({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "EGA Marketplace",
  description:
    "Rent or buy physical games and materials — table tennis, board games, PS5 titles, and more.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/apple-touch-icon.png", // optional, for iOS home screen
  },
  openGraph: {
    title: "EGA Marketplace",
    description:
      "Discover and enjoy fun games & materials. Rent short-term or buy for keeps!",
    url: "https://ega-market.vercel.app/",
    siteName: "EGA Marketplace",
    images: [
      {
        url: "/og.png", // your custom OG image
        width: 1200,
        height: 630,
        alt: "EGA Marketplace Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${inknut.className}
          antialiased  `}
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <div>{children}</div>
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
}
