// Next中文件夹结构就是路由结构
// 每个路由文件夹下都要一个page.js文件，React组件都是通过page.js中导出的
// 这里对应的URL是：/cabins

import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// 关于页面Cache的机制：
// Next中动态渲染的页面不会缓存，因为每次请求时都会生成新的 HTML。
// 静态渲染的页面会进行缓存，在构建时生成页面的 HTML，然后将其缓存，以便在每次请求时直接提供这些预生成的 HTML，叫增量静态生成（ISR）。
// 当 revalidate 被设置为 0 时，它实际上会将该页面配置为 “每次请求时重新生成”。这意味着页面会在每次请求时重新生成，并且不会从缓存中提供内容。也就是把页面转变成为动态渲染。
// revalidate: 10：页面将在每 10 秒钟进行一次重新验证，意味着 Next.js 会在后台重新生成页面并更新缓存。
export const revalidate = 0;

// 次级路由页面单独定义metadata，会覆盖根路由页面的metadata
export const metadata = {
  title: "Cabins",
};

// searchParams 是 URLSearchParams 对象的一个实例，用于解析和处理 URL 的查询参数（即 URL 中 ? 之后的部分）。它提供了一些方法来操作查询字符串，比如获取、设置、删除参数等。
// params 一般指的是 URL 路径参数（例如，/user/:id 中的 :id 部分），这通常是在路由系统中使用的

// Client component和Server component之间如何共享状态？最简单的方法是利用URL
export default async function Cabins({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Suspense 是一个用于处理异步操作和延迟渲染的功能。它允许你在等待异步内容加载时提供一个备用 UI（例如一个加载指示器） */}
      {/* 当Fetching Data或者Loading Code的时候，因为组件渲染需要一段时间，这时可以通过把要渲染的组件包裹在Suspense里来实现组件的异步加载 */}
      {/* 流程是页面渲染时，如果遇到Suspense部分，React/Next会创建Suspense Boundary，先显示Suspense里fallback部分的UI组件，等数据加载完再渲染需要渲染的组件，从而提高页面加载速度和响应能力 */}
      {/* 和直接使用loading.js不同，Suspense 允许你在组件树中精确控制异步组件的加载状态。你可以在需要的地方使用 Suspense，不需要全局处理所有加载状态 */}
      {/* 可以为不同的异步组件提供不同的加载指示器 */}
      {/* Suspense 使你能够在组件内部处理数据加载和异步状态，而不是依赖于外部的加载指示器。它可以与 React.lazy、动态导入等功能无缝配合 */}

      {/* 在 Suspense 组件内，如果你使用了 key，React 会识别不同的 key 值，进而决定是否需要重新创建或更新组件。这样做有助于确保 CabinList 组件在 filter 更改时能够得到正确的更新 */}
      {/* 当 filter 发生变化时，如果没有提供 key，React 会尝试重用现有的 CabinList 组件实例，而不是创建一个新的实例。这样，React 可能不会重新加载新的数据，导致 Spinner 不会显示，因为 React 认为 CabinList 组件仍然有效，并且没有触发重新加载 */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

