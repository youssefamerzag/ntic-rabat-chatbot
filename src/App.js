import { useEffect, useState } from 'react';
import './App.css';
import data from './bot.json';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [yourMessage, setYourMessage] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [nb, setNb] = useState(Math.floor(Math.random() * 3));

  const send = () => {
    const newList = [botMessage, yourMessage, ...messages];
    setMessages(newList);
    setNb(Math.floor(Math.random() * 3));
  };

  useEffect(() => {
    const checkMessage = (intent) =>
      intent.patterns
        .map((pattern) => pattern.toLowerCase())
        .includes(yourMessage.toLowerCase());

    for (let i = 1; i <= 30; i++) {
      if (checkMessage(data.intents[i])) {
        setBotMessage(data.intents[i].responses[nb]);
        return;
      }
    }

    // If no match is found
    setBotMessage("I'm sorry, I don't understand that.");
  }, [yourMessage, nb]);

  return (
    <div>
      <header>
        <p className="Headtitle">Chat with Bot Online</p>
        <p>Simply ask your AI chatbot assistant to generate!</p>
      </header>
      <body>
        <div className="chatBord">
          <div className="chat">
            <div className="messages">
              {messages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
            <div className="inputContainer">
              <input
                placeholder="Type your message..."
                onChange={(e) => setYourMessage(e.target.value)}
              ></input>
              <button onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default App;
