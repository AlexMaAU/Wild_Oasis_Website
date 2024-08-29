import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // callbacks 是一个用于定义回调函数的对象，这些函数可以在身份验证过程的不同阶段被自动调用
  callbacks: {
    // 定义了 authorized 回调函数，用于检查用户是否已登录（即 auth.user 是否存在）
    // authorized 回调: 在用户访问受保护资源时被调用，用于控制访问权限
    authorized({ auth, request }) {
      return !!auth?.user; // !!auth?.user 是一个简写，表示如果 auth.user 存在则返回 true，否则返回 false
    },
    // signIn 回调函数在用户尝试登录时被调用。它可以用来处理登录前的验证逻辑或修改身份验证流程
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true; // 只有返回true的时候才会通过验证
      } catch (error) {
        return false;
      }
    },
    // session 回调函数在用户登录成功后、会话创建时调用
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  // pages 字段用于自定义身份验证相关的页面路径
  // 这允许你定义自己网站上用户登录、注册、重置密码等功能的页面，而不是使用默认的 NextAuth.js 提供的页面
  pages: {
    signIn: "/login", // signIn: 指定自定义登录页面的路径
    signOut: "/logout", // signOut: 用于指定自定义登出页面的路径。用户登出后将被重定向到此页面。
  },
};

export const {
  auth, // NextAuth 实例，用于处理身份验证逻辑。这可以用来在 API 路由中获取身份验证状态或执行其他身份验证相关操作
  signIn,
  signOut,
  handlers: { GET, POST }, // 包含处理 HTTP 请求的 GET 和 POST 方法的对象。这些方法用于处理身份验证请求（例如，登录、登出、回调等）
} = NextAuth(authConfig);

