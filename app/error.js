// error.js 都是 client component
"use client";

// error.js在next中用来返回当发生错误时的页面，error.js只能捕捉渲染错误
// 根路径的layout.js的渲染错误, error.js无法捕捉，需要创建一个global-error.js的文件
// 可以接收error和reset作为参数
export default function Error({ error }) {
  const handleGoHome = () => {
    window.location.href = "/cabins"; // 强制返回cabins页，相当于强制重启页面
  };

  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={handleGoHome}
      >
        Try again
      </button>
    </main>
  );
}

