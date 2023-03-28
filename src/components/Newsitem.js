import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, desc, imgurl, newsurl, author, publishedAt , source} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgurl} className="card-img-top" alt="newsThumbnail" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small className="text-muted">- {author?author : "Unknown"} on {new Date(publishedAt).toUTCString()}</small></p>
            
            <div className="d-flex justify-content-between">
              <a
                href={newsurl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-primary"
              >
                Read more
              </a>

              <div className="div">
              <span className={source === "Independent" ? "badge bg-secondary" : "badge bg-info"}>{source}</span>
              </div>
              
            </div>
            
            
          </div>
        </div>
      </div>
    );
  }
}
