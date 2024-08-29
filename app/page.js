// Next中文件夹结构就是路由结构
// 每个路由文件夹下都要一个page.js文件，React组件都是通过page.js中导出的
// 但是这样有一个不好的地方，就是所有文件都叫Page.js，可读性不高。
// 解决方法是：1. function名称要可读，比如Home，Account等  2. 在setting里配置custom label：Item:**/app/**/page.js, Value:Page: ${dirname}，这样可以给每个page.js的文件名上加上注释

import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24">
      {/* 使用Image的技巧，如果是导入静态图片 */}
      {/* Image可以不设定宽高，使用图片自己的宽高，这样需要先导入图片 */}
      {/* fill表示图片填充整个父级容器，然后设定CSS为object-fit: cover，使得屏幕改变图片不会变形 */}
      <Image
        src={bg}
        fill // fill表示图片填充整个父级容器
        placeholder="blur" // 图片加载过程中模糊，加载完成后在清晰显示 (仅限静态导入图片的方式)
        quality={80}
        className="object-cover object-top" //object-cover 确保图片或媒体元素会覆盖其容器，保持内容比例，但可能会裁剪部分内容。object-top 确保图片或媒体元素的顶部对齐容器的顶部，如果有裁剪，裁剪会发生在底部。
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}

