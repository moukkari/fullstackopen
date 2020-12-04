import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [fetchStatus, setFetchStatus] = useState('Fetching data')
  const [countryData, setCountryData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [weather, setWeather] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryData(response.data)
        setFetchStatus('Data fetched')
      })
  }, [])

  const handleSubmit = (event) => event.preventDefault()
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    let tmpData = countryData.filter((country) => country.name.toLowerCase().includes(e.target.value))
    if (tmpData.length <= 10) { 
      setFilteredData(tmpData) 
    } else {
      setFilteredData([])
    }
  }

  let result = ''
  let weatherData = ''
  if (filteredData.length > 1) {
    result = filteredData.map(country => 
      <p key={country.capital}>
        {country.name} 
        <button onClick={() => setFilteredData([country])}>show</button>
      </p>
    )
  } else if (filteredData.length === 1) {
    const c = filteredData[0]
    const languages = c.languages.map(lang => <li key={lang.name}>{lang.name}</li>)

    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${c.capital}`)
      .then(response => {
        console.log(response.data)
        const w = response.data

        setWeather(
          <div>
            <h2>Weather in {w.location.name}</h2>
            <p>Temperature: {w.current.temperature}<br/>
            <img alt='' src={w.current.weather_icons[0]} /><br/>
            Wind: {w.current.wind_speed} mph, direction: {w.current.wind_dir}</p>
          </div>
        )
      })

    result = (
      <div>
        <h1>{c.name}</h1>
        <p>Capital: {c.capital}<br/>Population: {c.population}</p>
        <h2>Languages</h2>
        <ul>
          {languages}
        </ul>
        <img alt='' src={c.flag} width="10%" />
      </div>
    )
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder="search..." />
        <br/>{searchQuery}
      </form>
      <hr/>
      {fetchStatus}
      <hr/>
      {result}
      {weatherData}
      {weather}
    </div>
  );
}

export default App;
