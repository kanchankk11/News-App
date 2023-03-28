
import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 16,
    category: ""
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0
    };
  }
  capitaliseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  async componentDidMount() {
    let apiurl = `https://newsapi.org/v2/top-headlines?country=in&page=${this.state.page}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    //console.log(apiurl);
    this.setState({ loading: true });
    let data = await fetch(apiurl);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
    document.title = `News.IO - ${this.capitaliseFirstLetter(this.props.category? this.props.category : "Home")}`;
  }

  handlePage = async (direction) => {

    let apiurl = `https://newsapi.org/v2/top-headlines?country=in&page=${direction === "left" ? this.state.page - 1 : this.state.page + 1}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

    this.setState({ loading: true })
    let data = await fetch(apiurl);
    let parsedData = await data.json();

    if (direction === "left") {
      this.setState({ page: this.state.page - 1 });
    }
    else {
      if (direction === "right") {
        this.setState({ page: this.state.page + 1 });
      }
    }

    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
  }


  render() {
    return (
      <div className="container my-3">
        <h2>{`Top ${this.props.category === "All" ? "" : this.props.category} headlines`}</h2>
        {this.state.loading && <Spinner />}

        {!this.state.loading &&
          <div className="row my-1">
            {this.state.articles.map((element) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6" key={element.title}>
                  <Newsitem title={element.title} desc={element.description} imgurl={element.urlToImage === null ? "./newscover.jpg" : element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                </div>
              );
            })}
          </div>}
        <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-outline-primary" disabled={this.state.page === 1} onClick={() => this.handlePage("left")}>&larr; Previous</button>
          <button type="button" className="btn btn-outline-primary" disabled={this.state.page === Math.ceil(this.state.totalArticles / 16)} onClick={() => this.handlePage("right")}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
