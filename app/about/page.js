import Image from "next/image";
import Link from "next/link";
import { getCabins } from "../_lib/data-service";

// 设为3600秒后更新一次cache
export const revalidate = 3600;

// 次级路由页面单独定义metadata，会覆盖根路由页面的metadata
export const metadata = {
  title: "About",
};

export default async function About() {
  const cabins = await getCabins();
  const total_cabins = cabins.length;

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {total_cabins} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      {/* Image的另一个技巧，如果fill后不想把整个窗口覆盖，可以给父级盒子设定百分比，然后让图片覆盖整个父级盒子即可 */}
      {/* aspect-ratio：这是一个 CSS 属性，用于定义元素的宽高比。这个属性的值是一个比率，通常用两个数字表示，第一个数字是宽度，第二个数字是高度。
      1 / 1：这个值表示宽度和高度的比例是 1:1。这意味着无论元素的实际尺寸是多少，它的宽度和高度都会相等，因此形成一个正方形。 */}
      <div className="col-span-2 aspect-square relative">
        <Image
          src="/about-1.jpg"
          quality={50}
          fill
          className="object-cover"
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="col-span-2 aspect-square relative">
        <Image
          src="/about-2.jpg"
          fill
          quality={50}
          className="object-cover"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

