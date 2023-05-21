import useCacheQuery from "../Hooks/useCacheQuery";
import List from "../Components/list";
import { lineClamp } from "../utils";

function Users() {
  const { data, loading, error } = useCacheQuery({ url: "posts", isEnabled: true });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div style={{ width: "33.330%" }}>
      <h1>Users</h1>
      <List
        data={data}
        itemSize={150}
        renderItem={(data, style) => {
          const { title, body } = data;

          return (
            <li style={style}>
              <h3>{title}</h3>
              <p style={lineClamp(3) as any}>{body}</p>
            </li>
          );
        }}
      />
    </div>
  );
}

export default Users;
