import React, { useState } from 'react';
import background from './assets/background.jpg.avif';
import './App.css';

function App() {
  const [category, setCategory] = useState('');
  const [news, setNews] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const fetchNews = async () => {
    if (!category) {
      alert('Please select a news category');
      return;
    }
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=5&apiKey=7c565d743ee841f495718d23861214ac`
      );
      const data = await response.json();
      if (data.status === 'ok') {
        setNews(data.articles);
      } else {
        alert('Error fetching news');
      }
    } catch (error) {
      alert('Failed to fetch news');
    }
  };

  const handleSubscribe = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    try {
      // For now, just simulate successful subscription
      // We will connect this to backend next
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
        <button className="blue-button" onClick={fetchNews}>Get News</button>

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

        {/* Subscription Form */}
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
