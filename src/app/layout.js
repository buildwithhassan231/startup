import { Geist, Geist_Mono, Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Fonts used by the navbar (unchanged) ──────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ── Fonts used by the hero slider only ───────────────────────────────── */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://agencyname.com"),
  title: {
    default: "AgencyName | Web, SEO, Ads & Digital Marketing",
    template: "%s | AgencyName",
  },
  description:
    "Full-service digital agency — web development, SEO, Google Ads, digital marketing, and video editing.",
  openGraph: {
    siteName: "AgencyName",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
