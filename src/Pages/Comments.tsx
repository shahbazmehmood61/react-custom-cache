import React, { useEffect } from "react";
import useCacheQuery from "../Hooks/useCacheQuery";
import List from "../Components/list";
import { lineClamp } from "../utils";

function Comments() {
  const { data, loading, error, cancel } = useCacheQuery({ url: "comments", isEnabled: true });

  useEffect(() => {
    return () => {
      // console.log("unmounting comments");
      // cancel();
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  // const list = data.map((item: any) => {
  //   return (
  //     <div key={item.id}>
  //       <h1>{item.name}</h1>
  //       <p>{item.email}</p>
  //       <p>{item.body}</p>
  //     </div>
  //   );
  // });

  return (
    <div style={{ width: "33.33%" }}>
      <h1>Comments</h1>
      <List
        data={data}
        renderItem={(data, style) => {
          const { name, email, body } = data;

          return (
            <li style={style}>
              <h3>{name}</h3>
              <p>{email}</p>
              <p style={lineClamp(3) as any}>{body}</p>
            </li>
          );
        }}
      />
    </div>
  );
}

export default Comments;
