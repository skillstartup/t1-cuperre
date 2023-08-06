import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/home.css';

import NewsContent from './NewsContents';

function HomeState() {
  const [topic, setTopic] = useState("");
  const [newsContent, setNewsContent] = useState([]);
  const topicRef = useRef(""); // Create a ref to store the latest topic value

  function fetchNews(topicValue) {
    if (topicValue === "") {
      axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&sortBy=recent&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
      .then((res) => {
        setNewsContent(res.data.articles);
      })
      .catch((err) => console.log(err));
    } else {
      var yesterdaysDate = getYesterdayDate();
      axios
        .get(`https://newsapi.org/v2/everything?q=${topicValue}&from=${yesterdaysDate}&sortBy=recent&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
        .then((res) => {
          setNewsContent(res.data.articles);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    topicRef.current = topic; // Update the topicRef with the latest value of topic
  }, [topic]);

  useEffect(() => {
    // Immediately fetch news
    fetchNews(topic);

    // Set up an interval to fetch news every 30 seconds
    const intervalId = setInterval(() => fetchNews(topicRef.current), 30000);

    // Clean up the interval on component unmount to avoid memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  function getYesterdayDate() {
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

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <h1>HeadlineHunter</h1>
      <div className='news-container border-line'>
        <div className='search'>
          <input type="text" id="search" name="search" placeholder="Search topic" onChange={handleChange} value={topic}/>
          <button onClick={() => fetchNews(topic)}>Search</button><br></br>
        </div>
        <NewsContent allNews={newsContent}/>
      </div>
    </div>
  )
}

export default HomeState;