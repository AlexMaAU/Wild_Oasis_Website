import Link from "next/link";

import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

// Next Nested Routes，在二级路由下设置三级路由，只需要增加新的文件夹
// 每个文件夹一样需要page.js，可以单独设置layout.js和loading.js
export default async function Reservations() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

