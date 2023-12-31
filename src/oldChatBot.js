import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [messages , setMessages] = useState([])
  const [yourMessage, setYourMessage] = useState()
  const [botMessage ,setBotMessage] = useState()

  useEffect(() => {
    if (yourMessage === 'hi' || yourMessage === 'hello' || yourMessage === 'cc') {
      setBotMessage('hello, How can i help you today??');
    } else if (yourMessage === 'how are you' || yourMessage === 'how are u' || yourMessage === 'are you okay') {
      setBotMessage('I\'m fine, thank you so much. And you?');
    } else if (yourMessage === 'whats your name' || yourMessage === 'what is your name' ){
      setBotMessage('my name is ChatBot created by Youssef Amerzag') ;
    } else if (yourMessage === 'good' || yourMessage === 'fine' || yourMessage === 'great'){
      setBotMessage('good How can I help you')
    }else {
      setBotMessage('sorry i dont understand what you say')
    }
  }, [yourMessage]);
  

  const send = () => {
    const newlist = [ `Bot: ${botMessage}` ,`You: ${yourMessage}`, ...messages]
    setMessages(newlist)
  }

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
              {messages.map((message , index) => 
                <p key={index}>{message}</p>
              )}
            </div>
            <div className="inputContainer">
              <input placeholder="Type your message..." onChange={(e) => setYourMessage(e.target.value)}></input>
              <button onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default App;
