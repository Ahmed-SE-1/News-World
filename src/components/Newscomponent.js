import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
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
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  capitilize = (str)=>{
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async fetchnews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e301d61782447c29668a467994b4401&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: this.totalResults,/* totalResults is used to show the total number of pages. */
       loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e301d61782447c29668a467994b4401&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: this.totalResults,/* totalResults is used to show the total number of pages. */
       loading: false
    })
    this.props.setProgress(100);
  }

  handlePrev = async()=>{
      this.setState({
        page: this.state.page-1,
      })
      this.fetchnews()
  }

  handleNext = async()=>{
    if(!(this.state.page + 1 >this.state.totalResults/10)){
      this.setState({
        page: this.state.page + 1,
      })
      this.fetchnews()
      }
  }

  render() {
    return (
      <div className="my-5">
         <h1 className="text-center" style={{color:"#f55403"}}>NewsWorld - Top {this.capitilize(this.props.category)} Headlines</h1>
        <div className="row mx-2">
          {this.state.loading && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
              <Spinner />
            </div>
          )}
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div
                className="col-md-4 my-2"
                key={ /* key is used to identify the element in the API or list. */
                  element.url
                }
              >
                <Newsitems
                  title={element.title?element.title.slice(0,28):""} /*Slice is set to show the characters length that only 0-28 characters are show.*/
                  description={element.description?element.description.slice(0,80):""}
                  imageUrl={element.urlToImage?element.urlToImage:"https://media.gettyimages.com/id/182734414/photo/office-building.jpg?s=612x612&w=0&k=20&c=rJFaXufgYLneKLQDOJ-hpRnygM44QWMgAbaamJt3kuw="}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between mb-5 mt-2">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-danger" onClick={this.handlePrev}>&laquo; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/10)} className="btn btn-danger" onClick={this.handleNext}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}
