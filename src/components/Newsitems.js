import React, { Component } from "react";

export default class Newsitems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3 d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 translate-middle p-2 bg-danger border border-light" style={{ borderRadius:"36%", width:"15rem", left:"48%", textAlign:"center" }}><span className="fw-bolder">Source:</span> {source}</span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}..</p>
            <p className="card-text"><small className="text-body-secondary">Last updated {date} ago by {author}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
