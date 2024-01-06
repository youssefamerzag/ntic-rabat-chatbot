import { useEffect, useState } from 'react';
import './App.css';
import data from './istaBot.json';
import stringSimilarity from 'string-similarity';

const App = () => {

  const [yourMessage, setYourMessage] = useState('');
  const [botMessage, setBotMessage] = useState([
    'Salut, comment puis-je t\'aider aujourd\'hui<br/>'
  ]);
  const [messages, setMessages] = useState([botMessage]);

  const send = () => {
    const newList = [...messages,yourMessage, botMessage];
    setYourMessage('')
    setMessages(newList);
    };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  useEffect(() => {
    const checkMessage = (intent) => {
      const similarityThreshold = 0.6; 
      const patterns = intent.patterns.map((pattern) => pattern.toLowerCase());
      const userInput = yourMessage.toLowerCase();
  
      const matches = stringSimilarity.findBestMatch(userInput, patterns);
      const bestMatch = matches.bestMatch;
  
      if (bestMatch.rating >= similarityThreshold) {
        setBotMessage(intent.responses[0]);
        return true;
      }
  
      return false;
    };
  
    let matchFound = false;
    for (let i = 0; i < data.intents.length; i++) {
      matchFound = checkMessage(data.intents[i]);
      if (matchFound) {
        break;
      }
    }
  
    if (!matchFound) {
      setBotMessage('Sorry, I didn\'t understand that.');
    }

  }, [yourMessage]);
  

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
                value={yourMessage}
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
