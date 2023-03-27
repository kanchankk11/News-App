
import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
      
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles : 0
    };
  }

  async componentDidMount(){
    let apiurl = `https://newsapi.org/v2/top-headlines?country=in&page=${this.state.page}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=16`;
    this.setState({loading : true});
    let data = await fetch(apiurl);
    let parsedData = await data.json();
   
    this.setState({
      articles : parsedData.articles,
      totalArticles : parsedData.totalResults,
      loading : false
    })
  }

  handlePage = async (direction)=> {
    
    let apiurl = `https://newsapi.org/v2/top-headlines?country=in&page=${direction === "left" ?this.state.page-1 : this.state.page+1}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=16`;
    this.setState({loading : true})
    let data = await fetch(apiurl);
    let parsedData = await data.json();

    if(direction === "left"){
      this.setState({page : this.state.page-1});
    }
    else{
      if(direction === "right"){
        this.setState({page : this.state.page+1});
      }
    }
  
    this.setState({
      articles : parsedData.articles,
      totalArticles : parsedData.totalResults,
      loading : false
    })
  }
  

  render() {
    return (
      <div className="container my-3">
        <h2>Top headlines</h2>
        { this.state.loading && <Spinner />}

        { !this.state.loading &&
        <div className="row my-1">
          {this.state.articles.map((element) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6" key={element.title}>
                <Newsitem title={element.title} desc={element.description} imgurl={element.urlToImage === null ? "./newscover.jpg" : element.urlToImage } newsurl={element.url}
                />
              </div>
            );
          })}
        </div>}
        <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary" disabled = {this.state.page === 1} onClick={()=>this.handlePage("left")}>&larr; Previous</button>
        <button type="button" className="btn btn-outline-primary" disabled = {this.state.page === Math.ceil(this.state.totalArticles/16)} onClick={()=>this.handlePage("right")}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
