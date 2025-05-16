import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [searchCountry, setSearchCountry] = useState("")
  const [countryData, setCountryData] = useState([])
  
  //const [results, setResults] = useState([])

  const handleChange = (e) => {
    setSearchCountry(e.target.value)
    console.log(e.target.value)
  }

  let filteredCountry = []

  if(searchCountry.trim() === ""){
    filteredCountry = []
  } else {
     filteredCountry = countryData.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
  }


  useEffect(() => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCountryData(data)
        
      })
      
      .catch(err => console.error('Search failed', err))
  }, [])

  


  return (
    <>
      find countries <input value={searchCountry} onChange={handleChange}/>
      {filteredCountry.length > 9 && <p>Too many matches, specify another filter</p>}
      {filteredCountry.length <9 && filteredCountry.length > 1 && (
        <ul>
          {filteredCountry.map(country => <li key={country.cca3}>{country.name.common}</li>)}
        </ul>
      )}

      {filteredCountry.length === 1 && (
        <div>
          <h2>{filteredCountry[0].name.common}</h2>
          <p>Capital: {filteredCountry[0].capital}</p>
          <p>Area: {filteredCountry[0].area}</p>
          <p>Population: {filteredCountry[0].population.toLocaleString()}</p>
          <img src={filteredCountry[0].flags.png} width='125'/>
        </div>
      )}
     
    </>
  )
}

export default App
