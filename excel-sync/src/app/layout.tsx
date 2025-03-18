import type { Metadata } from "next";
import { ADLaM_Display } from "next/font/google";
import "./globals.css";

// font style
const adlam_display = ADLaM_Display({
  subsets: ["latin"], 
  weight: "400"
});


export const metadata: Metadata = {
  title: "Excel Sync App",
  description: "Sync your Excel files with ease", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        //className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
        className={adlam_display.className}
      >
        {children}
      </body>
    </html>
  );
}
