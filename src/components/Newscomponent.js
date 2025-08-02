import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export default class Newscomponent extends Component {

  static defaultProps = {
    country: 'us',
    category: 'general',
    pageSize: 8,
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    setProgress: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  capitilize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  fetchnews = async () => {
    this.props.setProgress(10);
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    let url = `http://localhost:5000/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
  
    try {
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Fetch failed:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    await this.fetchnews();
  }

  handlePrev = async () => {
    await this.setState(prevState => ({
      page: prevState.page - 1
    }));
    this.fetchnews();
  }

  handleNext = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      await this.setState(prevState => ({
        page: prevState.page + 1
      }));
      this.fetchnews();
    }
  }

  render() {
    return (
      <div className="my-5">
        <h1 className="text-center" style={{ color: "#f55403" }}>
          NewsWorld - Top {this.capitilize(this.props.category)} Headlines
        </h1>
        <div className="row mx-2">
          {this.state.loading && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
              <Spinner />
            </div>
          )}
          {!this.state.loading && Array.isArray(this.state.articles) && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <Newsitems
                  title={element.title ? element.title.slice(0, 28) : ""}
                  description={element.description ? element.description.slice(0, 80) : ""}
                  imageUrl={element.urlToImage ? element.urlToImage : "https://media.gettyimages.com/id/182734414/photo/office-building.jpg?s=612x612&w=0&k=20&c=rJFaXufgYLneKLQDOJ-hpRnygM44QWMgAbaamJt3kuw="}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between mb-5 mt-2">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-danger" onClick={this.handlePrev}>&laquo; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-danger" onClick={this.handleNext}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}
