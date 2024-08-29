// Next中middleware.js定义了中间件，是处理request发出以后到response返回之间的逻辑
// 可以用于身份验证、重定向、请求修改等操作
// 默认情况下，middleware会作用于每一个路由，所以需要具体指定，否则会出现因为太多redirect导致的错误

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   // 创建一个重定向响应，重定向用户到 /about 页面
//   // new URL("/about", request.url) 基于请求的原始 URL 创建一个新的 URL 对象，以确保重定向 URL 是完整的
//   // request.url 是原始请求的 URL
//   // 如果 request.url 是 https://example.com/account，则 new URL("/about", "https://example.com/account") 生成的重定向 URL 是 https://example.com/about
//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";

// 将 auth（NextAuth 实例）导出作为中间件
export const middleware = auth;

// 这个导出的配置对象指定了中间件应用的路径模式
// 这里对应的是auth.js中的回调函数，也就是说，当前设定的是只有访问/account路由的时候才会自动调用这些回调函数
export const config = {
  matcher: ["/account"], // matcher 配置告诉 Next.js 仅在请求路径匹配 /account 时应用这个中间件
};

