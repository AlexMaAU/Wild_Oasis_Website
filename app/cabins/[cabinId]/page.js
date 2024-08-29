// [cabinId] 表示dynamic route，/cabins/xxx 都会匹配到这个页面
// dynamic route就是创建一个nested folder，用 [xxx] 命名

// import DateSelector from "@/app/_components/DateSelector";
import CabinInfo from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
// import ReservationForm from "@/app/_components/ReservationForm";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// Dynamic metadata - 使用generateMetadata函数
// 默认传入URL中的params作为参数
// Next会等generateMetadata函数成功返回数据后再讲UI流传输到React客户端，这样有利于SEO
export async function generateMetadata({ params }) {
  try {
    const { name } = await getCabin(params["cabinId"]);
    return {
      title: `Cabin ${name}`,
    };
  } catch (error) {
    return {
      title: `Oops, something wrong`,
    };
  }
}

// generateStaticParams 是一个用于静态生成的功能。它主要在 getStaticPaths 函数中用来生成需要静态生成的路径参数。这些路径参数用于在构建时预渲染页面，从而提高应用的性能和加载速度。
// getStaticPaths 用于生成动态路由的静态页面，以确保这些页面在构建时被预渲染。因为目前是动态路径，Next默认会采取动态渲染的形式。通过getStaticPaths可以使得当前的cabin list页面都转换成静态渲染页面。
// 如果网页上有不会快速更新的动态渲染页面，可以通过这个方法来提高加载性能
export async function generateStaticParams() {
  const cabins = await getCabins();

  // 返回的数组元素，一定要是：{动态路由名: params} 的形式
  // 比如这里是在[cabinId]文件夹下，动态路由名就是cabinId。params是cabin.id，所以是{cabinId: id}的格式
  // 然后Next就会自动进行识别
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

// 动态路由默认会传入URL中的params作为参数
export default async function Cabin({ params }) {
  // 如果是这样写，那么代码会先等getCabin加载好，再进行getSettings的加载，最后是getBookedDatesByCabinId的加载
  // 这样页面加载会要很长的时间，比如getCabin加载需要2秒，getSettings需要3秒，getBookedDatesByCabinId需要4秒，那么整个页面开始渲染需要2+3+4秒
  // const cabin = await getCabin(params["cabinId"]);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params["cabinId"]);

  // 初步改进，使用Promise.all来对几个异步函数进行包裹，这样异步函数就可以同时进行加载
  // 但是这样改进的时间就是加载最长的那个异步函数的时间，那么整个页面开始渲染需要4秒
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params["cabinId"]),
  //   getSettings(),
  //   getBookedDatesByCabinId(params["cabinId"]),
  // ]);

  // 最好的解决方案：创建多个组件，把异步函数分别放到需要用到这些数据的组件中，然后让每个组件获取它需要的数据，这样组件可以分别在渲染完成后依次显示到父级页面中。这样可以保证父级页面会最快时间打开，然后逐步填充不同的组件模块
  const cabin = await getCabin(params["cabinId"]); // settings, bookedDates放到Reservation组件中获取

  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinInfo cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        {/* <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <DateSelector />
          <ReservationForm />
        </div> */}

        {/* 因为现在部分数据获取放到了Reservation组件里，这个组件加载会需要一定时间 */}
        {/* 使用Suspense包裹，可以确保父级页面先渲染出来，然后Reservation组件位置先显示Spinner，等组件渲染成功，再把Reservation组件显示到父级页面中 */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

