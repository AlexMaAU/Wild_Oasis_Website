// Next自带的Image可以实现图片自动优化，包括自动根据宽高调整图片大小，指定图片压缩质量和懒加载(只在图片进入viewpoint的时候才加载)等
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* 使用Image的技巧，如果是直接设定图片宽高 */}
      <Image
        src="/logo.png"
        height="60"
        width="60"
        quality={80}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;

