import React from "react";
import useCacheQuery from "../Hooks/useCacheQuery";
import List from "../Components/list";

function Users() {
  const { data, loading, error, cancel } = useCacheQuery({ url: "users", isEnabled: true });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div style={{ width: "33.33%" }}>
      <h1>Users</h1>
      <List
        data={data}
        itemSize={70}
        renderItem={(data, style) => {
          const { name, email } = data;

          return (
            <li style={style}>
              <h3>{name}</h3>
              <p>{email}</p>
            </li>
          );
        }}
      />
    </div>
  );
}

export default Users;
