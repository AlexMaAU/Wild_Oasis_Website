// Next默认的所有文件都是server component(Server as an integral part of React component tree)，也就是说，Next默认这些组件都是在server side进行渲染后返回给前端的，这样就不需要把代码打包进bundle
// 只有加了“use client”的文件才会变成client component，也就是传统意义上的React组件
// Next的核心思想是建立一个前后端混合的框架，默认组件在后端进行渲染，包括数据获取也都放在后端进行(data function)，只在需要UI交互时指定文件为前端组件(state function)
// 这样便可以避免React存在的一些问题，比如前端需要加载所有JS代码，以及前端组件渲染时可能存在大量的data fetching，因为传统的React是需要在前端组件中进行Data Fetching的

// 所有不需要用户交互的组件都应该是server component，也就是不需要对用户点击操作等进行UI反馈的组件，比如Layout，Item List等。
// 像Shopping Cart上商品数量的更新，Filter，Modal的开关，Dark Mode切换按钮这些需要用户交互的则应该是client component。

// 注意：如果父组件加上了use client成为client component，那么它的子组件也都默认是client component，这样就形成了一个client sub-tree。给父组件加上use client就是加上了client boundary。
// Next中的server-client boundary就是split point between server and client code。
// 1. 父级组件一旦声明为client component，它的所有子组件也都是client component，不可以再改变
// 2. client component不可以import server component

// 有一个懒人方法来识别：
// 1. Server component不能有state/hooks，也不能lift state up (本身就没有state)。如果添加state和hooks的，一定是client component。
// 2. 只有当IDE提示报错的时候才把组件加上use client，否则一律作为server component处理。

// Server components: 负责Data Fetching
// Client components: 不负责Data Fetching

// Server components: 可以渲染其他的client component和server component
// Client components: 可以渲染其他的client component和作为props传入的server component

// Server components: URL改变时就会重新渲染
// Client components: State改变时就会重新渲染

// import fonts - next内置的next/font/google
// 也可以是自己的font库，使用next/font/local来导入
import { Josefin_Sans } from "next/font/google"; // 从 next/font/google 包中导入的字体配置函数
const josefin = Josefin_Sans({
  subsets: ["latin"], // 指定只加载拉丁字符集，减少字体文件的大小和加载时间 (也可以是多个字符集)
  display: "swap", // 表示在字体加载完成之前，先使用备用字体显示文本，然后再切换到 Josefin Sans 字体
});

import Header from "./_components/Header";

// 根目录的layout.js中导入global.css
import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";

// 定义该页面的meta tag
// 该路由层级下有layout.js，那么metadata定义应该放到layout.js里，如果没有，可以放到page.js里
export const metadata = {
  title: {
    template: "%s | The Wild Oasis", // %s 表示子路由内的metadata title
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in Australia, surrounded by beautiful mountains and dark forests",
};

// Next中layout.js文件定义页面的布局，每个路由文件夹下都可以有单独的layout.js文件
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`} // 使用导入的第三方字体库
      >
        <Header />

        {/* ReservationProvider是client component，包裹的是server component，可以将server component作为child prop传递 */}
        <ReservationProvider>
          <div className="flex-1 px-8 py-12 grid">
            {/*  margin-left: auto; margin-right: auto; 可以使得main元素水平居中*/}
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </div>
        </ReservationProvider>
      </body>
    </html>
  );
}

