'use client'
import React, { useEffect } from 'react';

export default function DownloadPage() {
    useEffect(() => {
        const triggerDownload = async () => {
            try {
                const response = await fetch('/api/download');
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'contact_list.xlsx'; // adjust if needed
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (error) {
                console.error('Download failed:', error);
            }
        };

        triggerDownload();
    }, []);

    return (
        <div className="h-full w-full flex items-center justify-center">
            <h1 className="text-2xl font-bold">Downloading now...</h1>
        </div>
    );
}
