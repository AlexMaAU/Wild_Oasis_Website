"use client";

import Link from "next/link";

// Next中not-found.js专门处理404错误
// 和error.js的区别，error.js一般用来处理比如data fetch错误等问题，not-found.js是用来处理页面找不到的问题，比如URL中输入不存在的路由
function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;

