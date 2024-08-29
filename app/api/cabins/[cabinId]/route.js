// 模拟创建一个API，比如第三方机构可以通过这个API查询cabin的预定情况
// 不是给本项目使用，只是模拟如何定制一个API接口
// 接口的文件名需要是route.js

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// 函数名只能是GET/DELETE/POST/UPDATE等
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

