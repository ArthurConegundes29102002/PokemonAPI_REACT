import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './pokeapi.css';

export default function PokemonDetails() {
  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState<any>(null);
  const [data_img, setDataIMG] = useState<any>(null);
  const [data_type, setDataTYPE] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (userInput) {
      Catching_Data();
    } else {
      setData(null);
      setDataIMG(null);
      setDataTYPE(null);
      setError(null);
    }
  }, [userInput]);

  const Catching_Data = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`);

      let type_array: string[] = [];
      const { data } = response;
      data.types.map((e: any) => { 
        const type: string = e.type.name;
        type_array.push(type);
      });
      let type_array_result:string = type_array.join(' - ');

      setData(response.data);
      setDataIMG(response.data.sprites.front_default);
      setDataTYPE(type_array_result);

      setError(null); // Limpa o erro se a solicitação for bem-sucedida

    } catch (error) {
      console.error('Error catching the response:', error);
      setError('Infelizmente esse pokemon ainda não existe :('); // Define a mensagem de erro"

      // limpando os elementos após o erro de requisição
      setData(null);
      setDataIMG(null);
      setDataTYPE(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div className='big_container'>
      <input className='inputbox' type="text" value={userInput} onChange={handleInputChange} placeholder="digite um número..." />

      {error && <h2>Error: {error}</h2>}

      {data && data.name && (
        <div>
          <h1>Name: {data.name}</h1>
          <img src={data_img} alt={data.name} />
          <h2>Tipo do Pokemon: {data_type}</h2>
        </div>
      )}
    </div>
  );
}
