import { useEffect, useState } from 'react';
import './App.css';
import data from './istaBot.json';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [yourMessage, setYourMessage] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [nb, setNb] = useState(Math.floor(Math.random() * 3));

  const send = () => {
    const newList = [...messages,yourMessage, botMessage];
    setMessages(newList);
    setNb(Math.floor(Math.random() * 3));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  useEffect(() => {
    const checkMessage = (intent) =>
      intent.patterns.map((pattern) => pattern.toLowerCase()).includes(yourMessage.toLowerCase());
      for (let i = 0; i <= 27; i++) {
        if (checkMessage(data.intents[i])) {
          setBotMessage(data.intents[i].responses[0]);
          return;
      }
      }
    setBotMessage("I'm sorry, I don't understand that.");
  }, [yourMessage, nb]);

  return (
    <div>
      <header>
        <p className="Headtitle">NTIC Rabat ChatBot</p>
        <p></p>
      </header>
      <body>
        <div className="chatBord">
          <div className="chat">
          <div className="messages">
            {messages.slice(0).reverse().map((message, index) => (
              <div key={index} className={`message-bubble ${index % 2 == 0 ? 'user-message' : 'bot-message'}`}>
                <div dangerouslySetInnerHTML={{ __html: message }}/>
              </div>
            ))}
            </div>
            <div className="inputContainer">
              <input
                placeholder="Type your message..."
                onChange={(e) => setYourMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              ></input>
              <button onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </body>
      <div style={{textAlign : 'center', display : 'flex', justifyContent : 'center', marginTop : '50px'}}>
        <a href='https://github.com/youssefamerzag' style={{margin : '10px'}}><img width="41" height="41" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/FFFFFF/external-github-with-cat-logo-an-online-community-for-software-development-logo-bold-tal-revivo.png" alt="github"/></a>
        <a href='https://linkedin.com/in/youssefamerzag' style={{margin : '10px'}}><img width="45" height="45" src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png" alt="linkedin"/></a>
      </div>
    </div>
  );
};

export default App;
