import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0)


  const capitaliseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  

  const firstRun = async () => {
    let apiurl = `https://newsapi.org/v2/top-headlines?country=in&page=${page}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${props.pageSize}&category=${props.category}`;
    //console.log(apiurl);
    setLoading(true);
    let data = await fetch(apiurl);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults)
    setLoading(false);

    document.title = `News.IO - ${capitaliseFirstLetter(props.category ? props.category : "Home")}`;
  }

  useEffect(() => {
   firstRun();
  }, [])

  const handlePage = async (direction) => {

    let apiurl = `https://newsapi.org/v2/top-headlines?country=in&page=${direction === "left" ? page - 1 : page + 1}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${props.pageSize}&category=${props.category}`;

    setLoading(true);
    let data = await fetch(apiurl);
    let parsedData = await data.json();

    if (direction === "left") {
      setPage(page-1)
    }
    else {
      if (direction === "right") {
        setPage(page+1)
      }
    }

    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults)
    setLoading(false);
  }

  return (
    <div className="container my-3">
      <h2>{`Top ${props.category === "All" ? "" : props.category} headlines`}</h2>
      {loading && <Spinner />}

      {!loading &&
        <div className="row my-1">
          {articles.map((element) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6" key={element.title}>
                <Newsitem title={element.title} desc={element.description} imgurl={element.urlToImage === null ? "./newscover.jpg" : element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
              </div>
            );
          })}
        </div>}
      <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary" disabled={page === 1} onClick={() => handlePage("left")}>&larr; Previous</button>
        <button type="button" className="btn btn-outline-primary" disabled={page === Math.ceil(totalArticles / 16)} onClick={() => handlePage("right")}>Next &rarr;</button>
      </div>
    </div>
  );
}

News.defaultProps = {
  country: 'in',
  pageSize: 16,
  category: ""
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}