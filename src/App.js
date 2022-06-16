import axios from "axios"
import { useEffect, useState } from "react"
import Searcher from "./Searcher"
import Languages from "./Languages"
import Info from "./Info"
import Results from "./Results"
import Weather from "./Weather"


function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState({name: "", image: "", temp:"", wind:""})
  

  const baseUrl = process.env.REACT_APP_COUNTRIES_URL

  useEffect(() => {
    const getD = axios.get(baseUrl).then(response => response.data)
    getD.then(response => {
      setCountries(response)})
  }, [])

  const handleSearchInput = (event) => {
    setSearch(event.target.value)
    if(countries.filter( country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())).length === 1){
      const country = countries.filter( country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      const lat = country[0].latlng[0]
      const lon = country[0].latlng[1]
      const API_key = process.env.REACT_APP_API_KEY
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
      axios.get(weatherUrl).then(response => {
        const newWeatherSet = {
          name: response.data.name,
          image:`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
          temp: response.data.main.temp,
          wind: response.data.wind.speed
        }
        setWeather(newWeatherSet)
      }).catch(error => console.log(error))
    }

  }

  //WEATHER API CALL

  const showData = search === "" ? countries : countries.filter( country => country.name.common.toLowerCase().includes(search.toLowerCase())).map(el => <li key={el.name.official}>{el.name.common} <button onClick={handleSearchInput} value={el.name.common}>show</button></li>)
  const dataReq = showData.length > 10 ? "Too many matches, specify another filter" : showData.length <= 10 && showData.length !== 1 ? showData : countries.filter( country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  if(dataReq.length === 1){
    return(
      <>
        <Searcher handleSearch={handleSearchInput} searchValue={search}/>
        <br/>
        <hr/>
        <Info name={dataReq[0].name.common} capital={dataReq[0].capital} area={dataReq[0].area}/>
        <Languages languagesArray={Object.values(dataReq[0].languages)}/>
        <img alt="flag" src={dataReq[0].flags.png}/>
        <Weather country={weather.name} icon={weather.image} temperature={weather.temp} wind={weather.wind}/>
      </>
    )
  }

  return (
    <>
    <Searcher handleSearch={handleSearchInput} searchValue={search}/>
    <br />
    <hr />
    <Results liData={dataReq}/>
    </>
  );
}

export default App;
