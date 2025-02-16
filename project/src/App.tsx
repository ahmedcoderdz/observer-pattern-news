import React, { useEffect, useState } from 'react';
import { NewsAgency } from './NewsAgency';
import { NewsSubscriber } from './NewsSubscriber';

function App() {
  const [newsAgency] = useState(new NewsAgency());
  const [subscribers] = useState([
    new NewsSubscriber('Algeria News'),
    new NewsSubscriber('Tech Daily'),
    new NewsSubscriber('University Updates')
  ]);
  const [newsInput, setNewsInput] = useState('');
  const [updates, setUpdates] = useState<{ subscriber: string; news: string[] }[]>([]);

  useEffect(() => {
    // Subscribe all subscribers to the news agency
    subscribers.forEach(subscriber => {
      newsAgency.subscribe(subscriber);
    });

    // Cleanup on unmount
    return () => {
      subscribers.forEach(subscriber => {
        newsAgency.unsubscribe(subscriber);
      });
    };
  }, [newsAgency, subscribers]);

  const handlePublishNews = () => {
    if (newsInput.trim()) {
      newsAgency.publishNews(newsInput);
      setNewsInput('');
      
      // Update the UI with latest news logs
      setUpdates(subscribers.map(subscriber => ({
        subscriber: subscriber.getName(),
        news: subscriber.getNewsLog()
      })));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Observer Pattern Demo - News Agency
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newsInput}
              onChange={(e) => setNewsInput(e.target.value)}
              placeholder="Enter news to publish..."
              className="flex-1 p-2 border rounded-md"
            />
            <button
              onClick={handlePublishNews}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Publish News
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {updates.map(({ subscriber, news }) => (
            <div key={subscriber} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">{subscriber}</h2>
              <ul className="space-y-2">
                {news.map((item, index) => (
                  <li key={index} className="text-gray-600 border-l-4 border-blue-500 pl-4 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;