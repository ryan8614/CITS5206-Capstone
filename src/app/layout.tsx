import type { Metadata } from "next";
import { ADLaM_Display } from "next/font/google";
import "./globals.css"; 
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const adlam = ADLaM_Display({
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={adlam.className}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
