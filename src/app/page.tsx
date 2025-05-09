'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useRouter } from 'next/navigation'
import Header from '@/components/header';

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-screen h-screen">
      <Header />
        <div className="container flex flex-col items-center justify-center mx-auto bg-white text-black w-screen h-screen">
          <AntdRegistry>
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
              <div className="w-full max-w-xl text-center space-y-6">
                <h1 className="text-4xl font-extrabold text-gray-800">
                  Welcome to <span className="text-blue-600">excel-sync!</span>
                </h1>
                <p className="text-lg text-gray-600">
                  This web app lets you seamlessly synchronize your Excel files online. Please sign in or sign up to get started.
                </p>

                <div className="flex justify-center gap-6 pt-4">
                  <button
                    onClick={() => router.push('/signin')}
                    className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => router.push('/signup')}
                    className="px-6 py-2 rounded-xl bg-gray-300 text-gray-800 font-semibold hover:bg-gray-300 transition"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </AntdRegistry>
        </div>
      </div>
  );
}
