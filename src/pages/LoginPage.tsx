// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate(); // Usamos useNavigate para navegação

  const handleLogin = () => {
    if (name) {
      localStorage.setItem('userName', name);  // Armazenando o nome no localStorage
      navigate('/chatbot');  // Redireciona para a página de chat
    }
  };

  return (
    <div className="bg-green-500 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl text-green-500 font-bold mb-4">IFSULDEMINAS</h1>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)} // Atualizando o estado com o nome
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
