import "./index.css";

const moviePageTypes = [
  { id: 1, pageType: "popular", displayName: "Popular" },
  { id: 2, pageType: "upcoming", displayName: "Top Rated" },
  { id: 3, pageType: "top_rated", displayName: "Upcoming" },
];

const Navbar = (props) => {
  const {
    changeActivePage,
    changeSearchInput,
    searchInput,
    onClickSearchButton,
  } = props;
  const onClickMovieDb = () => {
    changeActivePage("popular");
  };
  const onChangeSearchInput = (event) => {
    changeSearchInput(event.target.value);
  };
  const onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      onClickSearchButton();
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-lg-container">
        <h1 onClick={onClickMovieDb} className="page-name">
          MovieDb
        </h1>
        <div className="nav-items-container">
          <ul className="nav-list">
            {moviePageTypes.map((eachItem) => {
              const onClickNavItem = () => {
                changeActivePage(eachItem.pageType);
              };
              return (
                <li key={eachItem.id}>
                  <p onClick={onClickNavItem} className="nav-item-text">
                    {eachItem.displayName}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="search-container-lg">
            <input
              type="search"
              value={searchInput}
              placeholder="Movie Name"
              className="search-input"
              onChange={onChangeSearchInput}
              onKeyDown={onEnterSearchInput}
            />
            <button
              onClick={onClickSearchButton}
              className="search-button"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="search-container-sm">
        <input
          type="search"
          value={searchInput}
          placeholder="Movie Name"
          className="search-input"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          onClick={onClickSearchButton}
          className="search-button"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
