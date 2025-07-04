import React, { useState } from 'react';
import background from './assets/background.jpg.avif';
import './App.css';

function App() {
  const [category, setCategory] = useState('');
  const [news, setNews] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchNews = async () => {
    if (!category) {
      alert('Please select a news category');
      return;
    }

    try {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

      let apiUrl = '';

      if (selectedDate) {
        apiUrl = `https://newsapi.org/v2/everything?q=${category}&from=${selectedDate}&to=${selectedDate}&sortBy=publishedAt&pageSize=5&apiKey=7c565d743ee841f495718d23861214ac`;
      } else {
        apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=5&apiKey=7c565d743ee841f495718d23861214ac`;
      }

      const isLocalhost =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
      const fetchUrl = isLocalhost ? proxyUrl + apiUrl : apiUrl;

      const response = await fetch(fetchUrl);
      const data = await response.json();

      if (data.status === 'ok') {
        setNews(data.articles);
      } else {
        alert('Error fetching news: ' + (data.message || 'Unknown error'));
        console.error('NewsAPI error:', data);
      }
    } catch (error) {
      alert('Failed to fetch news');
      console.error('Fetch error:', error);
    }
  };

  const handleSubscribe = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    try {
      setSubscribed(true);
      alert('Subscribed successfully! You will receive daily updates.');
    } catch (error) {
      alert('Subscription failed. Try again later.');
    }
  };

  const appStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={appStyle}>
      <div className="App">
        <h1>Latest News</h1>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select news category</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="politics">Politics</option>
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-picker"
        />

        <button className="blue-button" onClick={fetchNews}>
          Get News
        </button>

        <div className="news-list">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="news-item">
                <h3>{article.title}</h3>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    width="100%"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))
          ) : (
            <p>No news to display</p>
          )}
        </div>

        {!subscribed ? (
          <div className="subscription-form">
            <h3>Subscribe for daily news updates</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
            <button className="blue-button" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        ) : (
          <p>Thank you for subscribing! 🎉</p>
        )}
      </div>
    </div>
  );
}

export default App;
