import "./App.css";
import Comments from "./Pages/Comments";
import Users from "./Pages/Users";
import Posts from "./Pages/Posts";

const App = () => {
  return (
    <>
      <h1>Cached Virtualized Lists</h1>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <Comments />
        <Users />
        <Posts />
      </div>
    </>
  );
};
export default App;
