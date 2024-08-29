// 使用了state，所以这个需要是client component，要在代码最上方加上 use client
"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
      {count}
      <button onClick={() => setCount(count + 1)}>Add One</button>
    </div>
  );
}

