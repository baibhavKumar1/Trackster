import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
// import "@uploadthing/react/styles.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Trackster | Premium Event Management",
  description: "Your next event, unforgettable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", plusJakartaSans.variable, "font-sans", inter.variable, spaceGrotesk.variable, manrope.variable)}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background-dark text-slate-100 selection:bg-primary/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
