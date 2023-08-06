import '../../css/home.css';

process.env.TZ = 'PDT';

function NewsContents({allNews}) {

  function howLongAgo(publishedAt) {
    const publishedDate = new Date(publishedAt);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if the date has changed to the previous month
    if (yesterday.getDate() === today.getDate() && today.getMonth() > 0) {
      yesterday.setMonth(today.getMonth() - 1);
    }

    // Check if the date has changed to the previous year
    if (yesterday.getMonth() === 11 && today.getMonth() === 0) {
      yesterday.setFullYear(today.getFullYear() - 1);
    }

    const timeDifference = yesterday - publishedDate;
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else {
      return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    }
  }

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
}

export default NewsContents;