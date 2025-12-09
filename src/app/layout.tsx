import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AiAssistant } from "@/components/ai/AiAssistant";
import { AppProvider } from "@/providers/AppProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Nexus | Premium Marketplace",
  description: "The next generation of digital commerce powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AppProvider>
          <Header />
          <div className="pt-20 min-h-[calc(100vh-100px)]">
            {children}
          </div>
          <AiAssistant />
        </AppProvider>
      </body>
    </html>
  );
}
