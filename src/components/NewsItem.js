import React, { Component } from 'react'
import newsImg from '../newsImg.jpg'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
export default class NewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: <Spinner />,
            articles: [],
            country: "in",
            pagesize: Array.from({ length: 6 }),
            page: 1,
            totalResults: 0,
        }
        if (document.location.pathname !== "/") {
            document.title = "NewsMonkey-" + this.props.category;
        }
    }

    fetchMoreData = async () => {
        this.props.setProgress(15)
        this.setState({ page: this.state.page + 1 });
        this.setState({ spinner: <Spinner /> });
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.props.category}&page=${this.state.page + 1}&pagesize=${this.state.pagesize.length}&apiKey=${this.props.newsApi}`);
        let parsedData = await data.json();
        let filteredArticles = parsedData.articles.filter((e) => {
            return e.title !== "[Removed]" || e.description !== "[Removed]"
        })
        this.props.setProgress(70);
        this.setState({ articles: this.state.articles.concat(filteredArticles) });
        this.setState({ totalResults: parsedData.totalResults });
        this.setState({ spinner: null });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.props.setProgress(15)
        try {
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.props.category}&page=${this.state.page}&pagesize=${this.state.pagesize.length}&apiKey=${this.props.newsApi}`);
            let parsedData = await data.json();
            let filteredArticles = parsedData.articles.filter((e) => {
                return e.title !== "[Removed]" || e.description !== "[Removed]"
            })
            this.props.setProgress(70);
            this.setState({ articles: filteredArticles });
            this.setState({ totalResults: parsedData.totalResults });
            this.setState({ spinner: null });
            this.props.setProgress(100);
        } catch (error) {
            window.alert("API REQUEST LIMIT IS REACHED, COME BACK LATER")
            console.log(error);
            this.props.setProgress(100)
        }
    }
    render() {
        return (
            <>
                <h1 className='text-center mt-5'>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
                {this.state.spinner}
                <div className="container">
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={this.state.spinner}
                    >
                        <div className="row row-cols-1 row-cols-md-3 g-4 p-0 m-0">
                            {this.state.articles.map((e) => {
                                return <div className="col" key={e.publishedAt}>
                                    <div className="card shadow h-100">
                                        <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger">
                                            {e.source.name}
                                            <span className="visually-hidden">News Source</span>
                                        </span>
                                        <img src={e.urlToImage !== null ? e.urlToImage : newsImg} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{e.title}</h5>
                                            <p className="card-text">{e.description}</p>
                                            <p className="card-text mb-5"><small className="text-body-secondary">{new Date(e.publishedAt).toUTCString()}</small></p>
                                            <a href={e.url} className="btn btn-danger btn-sm position-absolute bottom-0 mb-3">Read More</a>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </div>
                    </InfiniteScroll>
                </div>

            </>


        )
    }
}
