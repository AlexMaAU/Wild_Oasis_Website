import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

// Next Nested Routes，在二级路由下设置三级路由，只需要增加新的文件夹
// 每个文件夹一样需要page.js，可以单独设置layout.js和loading.js
export default async function Profile() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* 如果要在Client Component中渲染Server Component，解决方案：把Server Component组件作为children prop传递给Client Component组件 */}
      {/* Profile Page组件是server component，可以渲染client component和server component */}
      {/* 当这个页面进渲染的时候，会先创建SelectCountry组件的实例，然后把实例作为child prop传递给UpdateProfileForm这个client component，
      这时SelectCountry组件的实例已经是React Element了，后面开始渲染SelectCountry这个client component的时候，已经可以获得SelectCountry组件实例的HTML代码和JS代码，所以就不会报错 */}
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}

