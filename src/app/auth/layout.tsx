import React from "react";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/components/header';

export default function AuthenLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col h-screen w-screen bg-white">
        <Header />
        <main className="container mx-auto flex flex-1 items-center justify-center">
          <AntdRegistry>
              {children}
          </AntdRegistry>
        </main>
      </div>
    );
  }