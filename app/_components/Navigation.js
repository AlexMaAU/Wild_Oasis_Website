// Next自带的Link，和React Router Link一样，可以实现不需要整个页面重新渲染就可以进行跳转
import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  // 调用auth以后的session
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Image
                src={session.user.image}
                width="32"
                height="32"
                className="rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest Area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest Area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

