import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "취권 - 취미를 권해요",
  description: "다양한 취미를 탐색하고 시작할 수 있는 종합 취미정보 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-2xl font-bold text-indigo-600">취권</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      href="/"
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      홈
                    </a>
                    <a
                      href="/categories"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      카테고리
                    </a>
                    <a
                      href="/recommendations"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      추천
                    </a>
                    <a
                      href="/community"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      커뮤니티
                    </a>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">알림 보기</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">사용자 메뉴 열기</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          {children}
          <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
              <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                <div className="px-5 py-2">
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    소개
                  </a>
                </div>
                <div className="px-5 py-2">
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    이용약관
                  </a>
                </div>
                <div className="px-5 py-2">
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    개인정보처리방침
                  </a>
                </div>
                <div className="px-5 py-2">
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    문의하기
                  </a>
                </div>
              </nav>
              <p className="mt-8 text-center text-base text-gray-400">
                &copy; 2024 취권. All rights reserved.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
