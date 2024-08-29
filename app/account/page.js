// Both server and client components are rendered on the server on the initial render
// In Next, the server-side rendering is split by routes. Each route can be either Static Rendering or Dynamic Rendering
// Static render，就是HTML是在build的时候生成的，或者在refetch data的时候在服务器端生成的，这就意味着HTML只会构建一次。适用于数据不会经常更新的页面。比如产品列表页。
// Dynamic render，就是HTML是在每次都新的request到达服务器端的时候生成的，适用于数据需要经常变化或者根据不同用户显示不同数据的情况。比如用户购物车页。
// Next中，默认页面都是静态渲染的，一个路由会在特定条件下自动切换成动态渲染(自动，不需要手动处理)：
// 1. URL has params - /xxx/:xxxx 动态路径 (根本原因是动态路径和查询参数情况下，Next需要根据URL来决定页面如何渲染，所以无法对页面进行预生成)
// 2. searchParams are used in the page component - /xxx?xx=xx 查询参数
// 3. headers() or cookies() are used in server components
// 4. uncached data request in server components

import { auth } from "../_lib/auth";

async function Account() {
  const session = await auth();
  console.log(session);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session.user.name}
    </h2>
  );
}

export default Account;

