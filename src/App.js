import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './index.css'
import api from './services/api';

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({})

  async function handleSearch(){
    // 01310930/json/
    if(input === ''){
      alert('Erro: Preencha com um CEP válido e somente com números');
       input('');
       return;

    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    } catch{
      alert('Erro ao consultar')
      setInput('')
    }
     
  }
  return (
    <div className="container">
      <h1 className="container-title">Consultar CEP</h1>
      <div className="containerInput">
        <input
          type="number"
          placeholder="Digite um CEP"
          value={input}
          maxLength='8'
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"></FiSearch>
        </button>
      </div>

  {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2 className="title-cep">CEP: {cep.cep}</h2>  
        <span className="span-info">Rua: {cep.logradouro}</span>
        <span className="span-info">Complemento: {cep.complemento}</span>
        <span className="span-info">Bairro: {cep.bairro}</span>
        <span className="span-info">Localidade: {cep.localidade} - {cep.uf}</span>
        <span className="span-info">DDD: {cep.ddd}</span>
      </main>
  )}

    </div>
  );  
}
export default App;
