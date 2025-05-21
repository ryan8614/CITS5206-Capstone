// Enable client-side rendering for this component
'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useRouter } from 'next/navigation'
import Header from '@/components/header';

export default function Home() {
  // Initialize the router for navigation
  const router = useRouter()
  return (
    // Main container with full viewport width and height
    <div className="w-screen h-screen">
      <Header />
      {/* Centered content area with white background */}
        <div className="container flex flex-col items-center justify-center mx-auto bg-white text-black w-screen h-screen">
          {/* Provide Ant Design context to all child components */}
          <AntdRegistry>
            {/* Center the welcome message and buttons vertically and horizontally */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
              <div className="w-full max-w-xl text-center space-y-6">
                {/* Main heading */}
                <h1 className="text-4xl font-extrabold text-gray-800">
                  Welcome to <span className="text-blue-600">excel-sync!</span>
                </h1>
                {/* Description */}
                <p className="text-lg text-gray-600">
                  This web app lets you seamlessly synchronize your Excel files online. Please sign in or sign up to get started.
                </p>
                {/* Sign in and Sign up buttons */}
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
