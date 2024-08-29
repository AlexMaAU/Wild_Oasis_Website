// error.js 都是 client component
"use client";

// 根路径的layout.js的渲染错误, error.js无法捕捉，需要创建一个global-error.js的文件
// global-error.js 是 Next.js 中用于处理全局错误的文件。它通常用于处理所有未捕获的错误。
export default function GlobalError({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={() => reset()} // 调用reset函数，尝试重新渲染该页面
      >
        Try again
      </button>
    </main>
  );
}

