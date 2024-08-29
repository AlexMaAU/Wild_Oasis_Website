/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "umxsqalvuoaaogzvkkuc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**", // 这个路径匹配你的图片 URL 中的 `/a/` 部分
      },
    ],
  },
};

export default nextConfig;

