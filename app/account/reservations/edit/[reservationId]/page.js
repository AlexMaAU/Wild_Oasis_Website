import SubmitButton from "@/app/_components/SubmitButton";
import { updateBookingAction } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

async function EditReservation({ params }) {
  const { reservationId } = params;
  const { numGuests, observations, cabinId } = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateBookingAction}
      >
        {/* server action中的formData只会传递表格中的输入的内容，如果需要传递其他数据给formData，那么有2种方法：
        方法1：添加隐藏字段，比如这里的input，添加一个input来传递需要的内容，然后把input设置为hidden，这样就不会显示(适用于添加1个新的数据)
        方法2：通过bind来创建一个新的action函数(适用于添加多个新的数据) */}
        <input type="hidden" value={reservationId} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
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
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton
            buttonText="Update reservation"
            pendingText="Updating"
          />
        </div>
      </form>
    </div>
  );
}

export default EditReservation;

