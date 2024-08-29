"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ buttonText, pendingText }) {
  // useFormStatus 钩子提供了对表单状态的访问，例如表单是否正在提交、是否提交成功等
  // 用于显示加载指示器、处理表单验证状态或更新 UI
  const { pending } = useFormStatus();

  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? pendingText : buttonText}
    </button>
  );
}

export default SubmitButton;

