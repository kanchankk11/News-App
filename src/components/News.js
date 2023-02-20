
import React, { Component } from "react";
import Newsitem from "./Newsitem";

export default class News extends Component {
  articles = [
    {
      "source": {
      "id": null,
      "name": "Shorpy.com"
      },
      "author": "jaynix01",
      "title": "They don't build them like they used to",
      "description": "In reply to Lunch Liquor Lunch: 1941:\n\nDC has lost of lot of good buildings. Just pains me to see these photos of how pretty the city used to be. There are still many buildings left. The biggest threat is to rowhouses that are being bastardized with \"popups.\"…",
      "url": "https://www.shorpy.com/node/26978#comment-231157",
      "urlToImage": "https://www.shorpy.com/files/images/SHORPY-8c36372a1.preview.jpg",
      "publishedAt": "2023-02-20T04:04:00Z",
      "content": "I'm sure the truck was stopped at a red light and the woman was hurrying to beat the light change. But it made me think of my next comment."
      }
  ];

  constructor() {
    super();
      
    this.state = {
      articles: this.articles,
      loading: false,
    };
  }

  async componentDidMount(){
    let apiurl = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${process.env.REACT_APP_API_KEY}`;
    let data = await fetch(apiurl);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles : parsedData.articles})
  }
  

  render() {
    return (
      <div className="container my-3">
        <h2>Top headlines</h2>

        <div className="row my-1">
          {this.state.articles.map((element) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6">
                <Newsitem title={element.title} desc={element.description} imgurl={element.urlToImage === null ? "./newscover.jpg" : element.urlToImage } newsurl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
