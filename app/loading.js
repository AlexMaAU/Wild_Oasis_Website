// Next中loading.js会默认作为Loader组件使用，loading.js作用于当前路径的page.js加载，layout.js还是会即时加载，相当于一个默认的占位符

import Spinner from "./_components/Spinner";

// 所以Next默认的文件架构：page.js, layout.js, loading.js
export default function Loading() {
  return <Spinner />;
}

