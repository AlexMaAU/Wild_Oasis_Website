"use client";

import Image from "next/image";
import { useReservation } from "./ReservationContext";
import { differenceInDays } from "date-fns";
import { createBookingAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  // 通过bind来创建一个新的action函数(适用于添加多个新的数据)，这样就可以给server action中的formData传递更多的数据
  // bind 方法创建了一个新的函数，这个新的函数有一个固定的第一个参数，即 bookingData。
  // null 在 bind 方法的第一个参数位置上，它指定了新函数的 this 绑定。如果你不需要改变 this 上下文，可以将它设置为 null 或 undefined。
  const bindCreateBookingAction = createBookingAction.bind(null, bookingData); //

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            width="32"
            height="32"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* server action中的formData只会传递表格中的输入的内容，如果需要传递其他数据给formData，那么有2种方法：
        方法1：添加隐藏字段，比如这里的input，添加一个input来传递需要的内容，然后把input设置为hidden，这样就不会显示(适用于添加1个新的数据)
        方法2：通过bind来创建一个新的action函数(适用于添加多个新的数据) */}
      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={async (formData) => {
          await bindCreateBookingAction(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>
          <SubmitButton buttonText="Reserve now" pendingText="Processing" />
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

