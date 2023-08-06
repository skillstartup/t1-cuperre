# Coding Challenge
<!-- This is a template for your Readme. Please keep the headings but remove the instructional text, and replace the video with your own screen recording. -->
## My Solution In Action
<!-- Add your screen recording here. You can drag the video from your local folder to this page to add it automatically.  -->


https://github.com/cincodemayo/coding-challenge-cuperre/assets/67213501/51556a1c-bcb0-47bd-bb42-a9165c5586e1



## What I Built
This is a news web application that allows users to view news and search for news articles relating to a topic they are interested in. Additionally, every thirty seconds the page is updated to search for articles relating to the topic entered by the user to ensure they view the latest news.

## How I Built It
This was built using

* [![React][React.js]][React-url]
* [News API](https://newsapi.org/)

Here's the code sample of all news articles the user searched passed as a prop to be rendered onto the page
```javascript
return (
  <div className="all-news">
    {allNews && allNews.length > 0 ? (
      allNews.map((news) => {
        return <div className="news-block" key={news.url}>
          <div className='split-left'>
            <p>{news.source.name}</p>
            <p>{howLongAgo(news.publishedAt)}</p>
            {news.urlToImage != null ? (<a href={news.url}><img className='news-img' src={news.urlToImage}></img></a>) : (<div></div>)}
          </div>
          <div className='split-right'>
            <a href={news.url}><h3>{news.title}</h3></a>
            <p>{news.description}</p>
          </div>
        </div>
      })
    ) : (
      <h1>No news related to your searched topic.</h1>
    )}
  </div>
)
export default NewsContents;
```
Here are some screenshots of the web application.
![home](https://github.com/cincodemayo/coding-challenge-cuperre/assets/67213501/e3bb6ec3-65df-4e31-a28d-190f26af74cf)
![apple](https://github.com/cincodemayo/coding-challenge-cuperre/assets/67213501/836cbfd0-45aa-4de7-b76d-7bfb95e5fd6f)


## Why I Built It This Way
My approach to this was to view it as a website that retrieved news articles via a public API and displayed the main content of the articles for the users. This way I can focus purely on retrieving the news articles relevant to the users' searched topic and display them in a suitable manner. The website layout was designed this way to be simple and was inspired by other well-known news websites where they showed only the important information for the news articles such as name, title, description and image. If they wished to read more they would be able to click on it to view the full article on the same website however for my implementation if they wished to read more about the news article they would click on the article where they will be redirected to the actual article itself. This way it also provides credit to the website that published the article themselves.

The News API was used as it was free for up to 100 API calls every 24 hours. If I wish to make more API calls I can pay a fee or subscription which makes this web application scalable as well.

Additionally, in my code solution, I had the NEWS_API key be in a `.env` file which was included inside the `.gitignore` file so it wouldn't be pushed onto the repository. This provides a layer of security so that if the source code was accessed or viewed by someone who didn't have permission to it they won't be able to abuse the number of API calls as they would need their own API key.


Axios request with API key retrieved from `.env` file
```javascript
axios
  .get(`https://newsapi.org/v2/everything?q=${topic}&from=${yesterdaysDate}&sortBy=recent&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
  .then((res) => {
    setNewsContent(res.data.articles);
  })
  .catch((err) => console.log(err));
```

## What I Would Do Differently
What would you do to improve or extend your solution

While the current implementation fulfils the requirements, there are several future enhancements that could be made to improve my solution. Here are just a few possible enhancements:

1. User Authentication and Personalization: Allowing users to create an account to personalise their news feed. This could enable saving favourite topics, setting preferences, and receiving tailored recommendations based on their interests.

2. Search Filters and Advanced Sorting: Adding filters so users can narrow down results by date range, news sources, or categories. Additionally, implementing more sorting options, such as sorting by relevance or popularity, improves the user experience.

3. Multilingual Support: Provide multilingual support to cater to a broader audience by translating news articles into different languages or allowing users to specify their preferred language for the content display.

4. Different API: Use a different news API that adds news articles more regularly than the current one used to get more up-to-date news.

5. Adding Routes: Having multiple routes for web applications is a standard practice that provides multiple advantages. Includes improved user experience, modularity and code organisation, SEO and accessibility, better performance and many more.

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
