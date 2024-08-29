import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASEURL,
  process.env.SUPABASE_SERVICE_ROLE // 这里不是使用Supabase Key，而是使用Supabase Service Role Secret，这个可以绕过RLS检查，这样哪怕没有把用户都加入到Supabase的user列表里也可以对Authenticated权限的表格进行操作
);

export default supabase;

