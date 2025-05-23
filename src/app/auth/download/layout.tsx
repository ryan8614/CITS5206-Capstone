import type { Metadata } from "next";
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
    title: "Download",
    description: "Trigger file download",
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="pt-24 flex-1">
                <AntdRegistry>{children}</AntdRegistry>
            </div>
        </div>
    );
}
