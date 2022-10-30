import axios from "axios";
import React, { useState, useEffect } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { mask } from "remask";
import './styles.css'
import imagemTourist from '../../Components/img/tourist.png'


export function Home() {

           // Manipulação das APIs e derivados delas:
  const [Countries, setCountries] = useState([]);
  const [selectCodes, setSelectCodes] = useState("");
  const [Cities, setCities] = useState([]);
  const [citiesName, setCitiesName] = useState([]);
  const [chosenCities, setChosenCities] = useState();
  const [chosenCountries, setChosenCountries] = useState();

           // Dados do usuário:
  const [cpf, setCpf] = useState('');
  const [tel, setTel] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');


          // Requisião às APIs
  useEffect(() => {
    axios
    .get('https://amazon-api.sellead.com/country')
    .then((response) => {setCountries(response.data)})
  }, []);

  useEffect(() => {
    axios
    .get('https://amazon-api.sellead.com/city')
    .then((response) => {setCities(response.data)})
  }, [setCountries]);


            // Mostrar cidades dos países selecionados
  function onSelectCountry (selectedList, selectedItem) {
    setChosenCountries(selectedList.map( e => e.name_ptbr));
    setCitiesName([]);
    selectedList.map( e => {
      let c0de = e.code
      // setChosenCountries(chosenCountries => [...chosenCountries, e.name_ptbr]);
      for (let i = 0; Cities.length>i; i++) {
      if (Cities[i].country_code == c0de) {
        setCitiesName(citiesName => [...citiesName, Cities[i]])
      } else {
      }
  }})
};

          // Remoção de países e automaticamente remoção das cidades
function onRemoveCountry (selectedList, removedItem) {
  selectedList.splice(selectedList.indexOf(removedItem), 0);
  setCitiesName([]);
  selectedList.map( e => {
    let ex = e.code
    setSelectCodes(ex)
    for (let i = 0; Cities.length>i; i++) {
      if (Cities[i].country_code == ex) {
        setCitiesName(citiesName => [...citiesName, Cities[i]])
      } else {
      }}
})
}

          // Seleção das cidades
function onSelectCity (selectedList, selectedItem) {

  setChosenCities(selectedList.map( e => e.name));

};

function onRemoveCity (selectedList, removedItem) {
  selectedList.splice(selectedList.indexOf(removedItem), 0);
  setChosenCities([]);
  setChosenCities(selectedList.map( e => e.name));
}

          // Setando o nome e o email
function handleName(ev) {
  setUserName(ev.target.value)
}

function handleEmail(ev) {
  setUserEmail(ev.target.value)
}
          // Máscara para telefone e cpf
function mascaraCpf(ev) {
  setCpf(mask(ev.target.value, ['999.999.999-99']))
}

function mascaraTel(ev) {
  setTel(mask(ev.target.value, ['(99)9999-9999', '(99)99999-9999']))
}


          // Evento de submissão do formulário
function eventSubmit(e) {
  e.preventDefault();
  alert('Enviado! Olhe o console.')
  console.log(`Nome: ${userName}`)
  console.log(`Email: ${userEmail}`)
  console.log(`Telefone: ${tel}`)
  console.log(`CPF: ${cpf}`)
  console.log(`País(es) selecionado(s): ${chosenCountries}`)
  console.log(`Cidade(s) selecionada(s): ${chosenCities}`)
};


  return (
    <div className="container">

      <main className="main-box">
          
        <div className="img-box">
          <img src={imagemTourist}/>
        </div>

        <div className="form-box">
          <h1>Para onde gostaria de ir?</h1>
          <form name="travelForm" action="#" onSubmit={eventSubmit}>

            <div className="form-input">
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" value ={userName} onChange={handleName} placeholder="Digite seu nome" required/>
            </div>

            <div className="form-input">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value ={userEmail} onChange={handleEmail} placeholder="Digite seu email" required/>
            </div>

            <div className="tel-cpf">
              <div className="form-input" className="w50">
                <label htmlFor="tel">Telefone:</label>
                <input type="tel" id="tel" value={tel} onChange={mascaraTel} placeholder="Digite seu telefone" required/>
              </div>

              <div className="form-input" className="w50">
                <label htmlFor="cpf">CPF:</label>
                <input id="input-cpf" value ={cpf} onChange={mascaraCpf} type="text" autoComplete="off" maxLength="14" id="cpf" placeholder="Digite seu CPF" required/>
              </div>

            </div>

            {<Multiselect className="multiselect" options={Countries} displayValue="name_ptbr" placeholder="Selecione um ou mais países" onSelect={onSelectCountry} onRemove={onRemoveCountry}/>}
            {<Multiselect name="citiesMultiSelect" className="multiselect" onSelect={onSelectCity} onRemove={onRemoveCity} options={citiesName} placeholder="Selecione uma ou mais cidades"displayValue="name"/>}

            <input className="button" id ="btn-send" type="submit"  value="Enviar" />

          </form>

        </div>
      </main>
    </div>
  )
}