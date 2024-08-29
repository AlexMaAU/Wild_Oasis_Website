"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  // 这个钩子返回当前 URL 的查询字符串部分(?后面的部分)，通常是一个对象或某种形式的查询参数集合
  const searchParams = useSearchParams(); // 获取当前 URL 的查询参数
  // 包含用于路由操作的方法，比如 push、replace 等，以及有关当前路由的信息
  const router = useRouter(); // 提供 Next.js 的路由对象，用于程序化导航
  // 当前 URL 的路径部分，不包括查询字符串。比如，对于 URL https://example.com/products?category=books，pathname 是 /products
  const pathname = usePathname(); // 获取当前路由的路径名

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    // URLSearchParams 是一种用于处理 URL 查询字符串（即 URL 中 ? 之后部分）的接口。它提供了一种简便的方式来解析、构建和操作查询字符串参数。
    // URLSearchParams 是 Web API 的一部分
    const params = new URLSearchParams(searchParams);
    // 设置或更新 capacity 参数的值为 filter。如果 capacity 参数已经存在，它将被更新；如果不存在，它将被添加
    params.set("capacity", filter);
    // 使用 router.replace 方法来更新当前 URL，而不引起页面滚动。
    // replace 方法用于替换当前历史记录中的 URL，而不是向浏览器历史记录中添加一个新条目。
    // ${pathname}?${params.toString()}: 生成新的 URL，包含更新后的查询字符串。
    // { scroll: false }: 选项，用于指示路由更新时不滚动到页面顶部。
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {/* client component的子组件也全都是client component */}
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1-3 Guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4-7 Guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8+ Guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;

