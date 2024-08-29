import Image from "next/image";
import { signInAction } from "../_lib/actions";

// 这是个server component，所以不能设置onClick，因为服务器组件不应该有UI交互操作
// 应该使用server action，通常通过表格提交来实现
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;

