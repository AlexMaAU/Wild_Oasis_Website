"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteBookingAction } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  // useTransition 允许你将某些状态更新标记为“过渡”状态，React 将这些更新安排在低优先级进行。
  // 这意味着这些过渡更新不会阻塞用户的主要交互（如点击、输入等），从而使得应用保持响应性。同时可以根据isPending来判断过渡更新是否仍在进行中，从而显示不同UI。
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    // 把server action放进startTransition里，表示需要标识这个回调函数的过程是一个transition
    // 等transition结束，isPending就会变成true
    startTransition(() => deleteBookingAction(bookingId));
  }

  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={handleDelete}
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;

