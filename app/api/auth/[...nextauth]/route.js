// ...nextauth表示catch all，用于捕获所有以 /api/auth/ 开头的请求
// 使用Next Auth，api/auth/[...nextauth]一定要创建，然后route.js文件一定要添加，否则Next无法处理

// 虽然在auth.js中没有直接调用GET和POST，它们仍然是由NextAuth自动处理的，用于处理API请求。
// NextAuth会自动根据你的配置处理各种身份验证相关的请求，并将这些请求路由到适当的处理函数上。
export { GET, POST } from "@/app/_lib/auth";

