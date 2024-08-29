import SideNavigation from "../_components/SideNavigation";

// 次级路由页面单独定义metadata，会覆盖根路由页面的metadata
export const metadata = {
  title: "Guest Area",
};

export default function AccountLayout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}

