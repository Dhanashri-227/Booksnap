import BookItems from "../component/BookItems";
import { useLoaderData } from "react-router-dom";

export default function MyBooks() {
  const books = useLoaderData();

  return (
    <>
      <section className="home">
        <div className="left">
          <h1>My Books</h1>
          <h5>   <BookItems />.</h5>
        </div>
      </section>
      {/* <div className="recipe">
        <BookItems />
      </div> */}
    </>
  );
}
