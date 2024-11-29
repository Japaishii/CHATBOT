import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatPage: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { sender: userName, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('https://13f5-200-131-57-199.ngrok-free.app/gpt', {
        to: "felipe",
        from: "chatgpt",
        message: input,
      });

      const botMessage = { sender: 'BOT-IF', text: response.data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const handleKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter'){
      e.preventDefault()
      handleSend()
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-700 to-green-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-green-800 text-white py-4 px-6">
          <h1 className="text-2xl font-bold text-center">CHAT IFSULDEMINAS</h1>
        </header>

        {/* Chat Box */}
        <div className="p-6 bg-gray-100 h-96 overflow-y-auto">
          <div className='mb-3 p-3 rounded-lg max-w-[80%] bg-green-500 text-white self-start'>
          <strong>BOT-IF:</strong> Olá <strong>{userName}</strong>, eu sou o BOT-IF, posso te ajudar com perguntas sobre o campus.
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'BOT-IF'
                  ? 'bg-green-500 text-white self-start'
                  : 'bg-gray-300 text-gray-900 self-end'
              }`}
              style={{
                alignSelf: msg.sender === 'BOT-IF' ? 'flex-start' : 'flex-end',
              }}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Input and Button */}
        <div className="flex items-center bg-white p-4 border-t border-gray-300">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-l-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Digite sua mensagem..."
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-r-lg transition-all"
            onClick={handleSend}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
