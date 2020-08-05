import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import './index.css';
import axios from 'axios'

const Weather = ({countryName}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=`+ api_key +`&query=`+ countryName +``)
      .then( response => {
        console.log("response", response.data)
        setWeather(response.data);
      })
  }, [])

  console.log("weather", weather);

  return (
    <div>
      <h3>Weather in {countryName}</h3>
      <div>
        {
          weather 
          ? 
            <>
              <p>{countryName}</p>
              <p>Temperature: {weather.current.temperature}</p>
              <img src={weather.current.weather_icons[0]}/>
            </>
          : 
            null
        }
      </div>
    </div>
  )
}

const App = () => {
  
  const [ results, setResults ] = useState([]) 

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResults(response.data)
      })
  }

  const [ filter, setFilter ] = useState([]) 
  const [ detailed, setDetailed ] = useState([]) 
  const [ specific, setSpecific ] = useState(false)

  // console.log("resultsHook", results)
  
  useEffect(hook, [])

  const filterSearch = (event) => {
    console.log(detailed)
    const result = results.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase()))

    if (result.length > 10) {
      setFilter(false)
      setDetailed(false)
      setSpecific(true)
    } 
    else if (result.length === 1) {
      setFilter(false)
      setSpecific(false)
      setDetailed(result)
      
    }
    else {
      setDetailed(false)
      setSpecific(false)
      setFilter(result)
      // console.log(result)
    }
  }

  const showButton = (event) => {
    event.preventDefault()
    const countryName = event.target.previousSibling.innerText
    const country = results.filter(x => x.name.toLowerCase().includes(countryName.toLowerCase()))
    setDetailed(country)
  }

  const Button = () => {
    return (
      <>
        <button onClick={showButton}>Show</button>
      </>
    )
  }

  return (
    <div>
        <form>
          find countries <input onChange={filterSearch}/>
          <p>results</p>
            { specific 
              ? <p>Too many matches, please be more specific</p> 
              : null 
            }
        </form>
        <div>
          { filter 
            ? filter.map(x => 
              <div className="button-div">
                <p key={x.name}>{x.name}</p>
                <Button name={x.name}></Button>
              </div>)
            : null 
          }
        </div>
        <div>
          { detailed 
            ? detailed.map(x => 
              <div key={x.name}>
                <h1>{x.name}</h1>
                <p>Capital: {x.capital}</p>
                <p>Population: {x.population}</p>
                <ul>{x.languages.map(x => <li>{x.name}</li>)}</ul>
                <img className="flag" src={x.flag}/>
              </div>)
            : null
          }
        </div>
        <div>
        <Weather countryName=
          {
            detailed.length > 0 
            ? detailed[0].name 
            : null
          } 
        />
        </div>
    </div>

  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))