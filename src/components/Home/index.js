import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import Navbar from "../Navbar";
import MovieCard from "../MovieCard";
import "./index.css";

const apiKey = process.env.REACT_APP_API_KEY;

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    activePage: "popular",
    searchInput: "",
    pageNo: 1,
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const { activePage, searchInput, pageNo } = this.state;
    let apiUrl = "";
    if (searchInput !== "") {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${pageNo}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/${activePage}?api_key=${apiKey}&language=en-US&page=${pageNo}`;
    }
    const response = await fetch(apiUrl);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.results.map((movie) => ({
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        rating: Math.round(movie.vote_average * 10) / 10,
      }));
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  changeActivePage = (activePage) => {
    this.setState({ activePage }, this.getMovies);
  };

  onClickSearchButton = () => {
    this.getMovies();
  };

  changeSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };

  changeToNextPage = () => {
    const { pageNo } = this.state;
    if (pageNo <= 500) {
      this.setState({ pageNo: pageNo + 1 }, this.getMovies);
    }
  };

  changeToPreviousPage = () => {
    const { pageNo } = this.state;
    if (pageNo > 1) {
      this.setState({ pageNo: pageNo - 1 }, this.getMovies);
    }
  };

  renderFailureView = () => (
    <div className="movies-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-movies-error"
        className="movies-failure-img"
      />
      <h1 className="movie-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="movies-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  renderMoviesListView = () => {
    const { moviesList } = this.state;
    const shouldShowProductsList = moviesList.length > 0;

    return shouldShowProductsList ? (
      <div className="all-movies-container">
        <ul className="movies-list">
          {moviesList.map((movie) => (
            <MovieCard movieData={movie} key={movie.id} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            onClick={this.changeToPreviousPage}
            className="pagination-button"
            type="button"
          >
            Previous Page
          </button>
          <button
            onClick={this.changeToNextPage}
            className="pagination-button"
            type="button"
          >
            Next Page
          </button>
        </div>
      </div>
    ) : (
      <div className="no-movies-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-movies-img"
          alt="no movies"
        />
        <h1 className="no-movies-heading">No Movies Found</h1>
        <p className="no-movies-description">
          We could not find any movies. Try other movie names.
        </p>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="movies-loader-container">
      <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderAllMovies = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };
  render() {
    const { searchInput } = this.state;
    return (
      <>
        <Navbar
          changeActivePage={this.changeActivePage}
          changeSearchInput={this.changeSearchInput}
          searchInput={searchInput}
          onClickSearchButton={this.onClickSearchButton}
        />
        <div className="all-movies-section">{this.renderAllMovies()}</div>
      </>
    );
  }
}

export default Home;
