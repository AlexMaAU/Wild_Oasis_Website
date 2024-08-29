// "use server" 指令用于明确标记服务器动作（Server Actions）的 JavaScript 文件或代码块，以确保它们在服务器端执行
// Server component中一般只能处理data fetching的逻辑，那么如果需要在服务器端对数据进行mutation操作(Post, Update, Delete)，需要定义Server Actions
// Server action和Server Component不是一回事，Server Component本质上就是在服务器端渲染的组件，而Server action是运行在服务器端的操作函数
// Server action文件一定要加上use server
// 定义了Server action以后，一般都是和form，event handler(client component)和useEffect(client component)这类结合时候，form提交的时候会有action，这个action就是对应的Server Action。
// Next会给每个server action都创建一个API endpoint(with URL)，每次当server action被调用，都会对它的URL发起POST请求。这些endpoint和URL都是Next自行处理的，外部不可见(已经抽象出来)，对于开发者来说，只需要直接使用server action中的函数即可。
// Server action是不会反向把代码泄露给服务器端的，所以在Server action中可以安全使用Key等敏感信息
// Server action最大的好处是不再需要创建单独的API或者Router handler来mutate data。
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function deleteBookingAction(bookingId) {
  // 检验用户是否登录
  const session = await auth();
  if (!session) throw new Error("You much be logged in");

  // 防止用户通过后台获取API，然后恶意删除其他用户的booking
  // 用户只能删除属于自己的Booking信息
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    // 如果要删除的bookingId不在用户自己的bookingId数组里，直接报错
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData) {
  // FormData 对象用于处理表单数据，并提供 .get(name) 方法来获取指定名称的字段值
  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");

  // 检验用户是否登录
  const session = await auth();
  if (!session) throw new Error("You much be logged in");

  // 防止用户通过后台获取API，然后恶意删除其他用户的booking
  // 用户只能删除属于自己的Booking信息
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    // 如果要更改的bookingId不在用户自己的bookingId数组里，直接报错
    throw new Error("You are not allowed to update this booking");

  const updateData = { numGuests, observations };

  await updateBooking(bookingId, updateData);

  redirect("/account/reservations");
}

export async function createBookingAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You much be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000), // 只截取前1000个字符
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/account/reservations/success");
}

export async function updateGuestAction(formData) {
  // 后端的基本原则：永远不要依赖于前端，也不要相信前端传来的数据，所以后端依然要进行检验
  // 检验用户是否登录
  const session = await auth();
  if (!session) throw new Error("You much be logged in");

  // 检验数据是否安全
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  await updateGuest(session.user.guestId, updateData);

  // revalidatePath("/account/profile")是立刻刷新该路径的cache，使得最新数据可以马上渲染
  // Next中使用server action更新数据后，需要使用这个方法来使得前端可以马上重新渲染，因为Next有自己的Cache机制，否则前端的数据需要一段时间后才会重新从服务端获取
  revalidatePath("/account/profile");
}

export async function signInAction() {
  // signIn 是 NextAuth.js 提供的一个函数，用于启动身份验证流程。在这个例子中，它被调用来处理 Google 的身份验证。
  // redirectTo 指定了用户在登录成功后应被重定向到的 URL
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

