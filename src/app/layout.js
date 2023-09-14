import "./globals.css";
import { Inter, Source_Sans_3, Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans-3",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata = {
  title: "ReuvPlay",
  description: "Video Segements And Text Conversion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spaceMono.variable} ${sourceSans3.variable}`}
      >
        <div id="modal-root" />
        <div id="backdrop-root" />
        {children}
      </body>
    </html>
  );
}
