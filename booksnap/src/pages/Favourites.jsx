import BookItems from "../component/BookItems";

export default function FavBooks() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email ?? "guest";

  // ✅ Get full book objects stored in user's favourites
  const favBooks = JSON.parse(localStorage.getItem(`fav_${userEmail}`)) ?? [];

  return (
    <section className="home">
      <div className="left">
        <h1>Favourite Books</h1>
        <BookItems books={favBooks} fromFavPage={true} />
      </div>
    </section>
  );
}
