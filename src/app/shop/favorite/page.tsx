import FavoriteList from "./FavList";

const FavoritePage = () => {
  return (
    <div className="mt-40">
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          Your Favorites Products
        </h1>
        <FavoriteList />
      </div>
    </div>
  );
};

export default FavoritePage;
