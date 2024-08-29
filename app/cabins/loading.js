import Spinner from "../_components/Spinner";

// 给次级路由页面定义单独的Loading，这样会覆盖根路径定义的loading.js
// 仅作用于当前路由的页面，其他次级路由页面依然使用根路径定义的loading.js
export default function CabinsLoading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}

