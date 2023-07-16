import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './pokeapi.css';

export default function PokemonDetails() {
  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState<any>(null);
  const [data_img, setDataIMG] = useState<any>(null);
  const [data_type, setDataTYPE] = useState<any>(null);
  // const [pokemon_attack, setDataHabilities] = useState<any>(null);
  
  // ------------------------------------------------- implementando o UseEffect:

  useEffect(() => {
    if (userInput) {
      Catching_Data();
    } else {
      setData(null);
      setDataIMG(null);
      // setDataTYPE([null]);
      setDataTYPE(null)
    }
  }, [userInput]);

// -------------------------------------------------------------------------------------------------- Definindo constante para receber os dados da API:

  const Catching_Data = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`);

      // --------------------------------------------Separando os tipos de dados:

      let type_array:String[]=[]
      console.log(response)
      const {data} = response
      data.types.map((e:any)=>{ 
        const type:string= e.type.name //nome do tipo do pokemon
        type_array.push(type)
      })
      let type_array_result = type_array.join(' ') //aqui eu estou separando os valores que saem do "type array" com um espaço evitando que fiquem juntos
      
      setData(response.data);
      setDataIMG(response.data.sprites.front_default)
      setDataTYPE(type_array_result)


      // --------------------------------------------
    } catch (error) {
      console.error('Error catching the response:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

// --------------------------------------------------------------------------------------------------
  return (
    <div className='big_container'>

      <input  className='inputbox' type="text" value={userInput} onChange={handleInputChange} placeholder="digite um número..." />

      {data && data.name && <h1>Name: {data.name}</h1>}

      <img src={data_img}/>
      
      <h2>Tipo do Pokemon: {data_type}</h2>

    </div>
  );
}
