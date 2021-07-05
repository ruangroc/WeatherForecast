/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Search from './Search';
import Weather from './Weather';
import Map from './Map';
import Navbar from './Navbar';

export default function App() {
  const styles = css`
    .leftColumn{
      width: 70%;
      text-align: left;
      color: #023047;
      margin-right: 1.5%;
      margin-left: 0.5%;
    }

    .container{
      display: flex;
      justify-content: center;
    }

    .cardContainer{
      display: flex;
    }

    .iconsContainer{
      display: flex;
      justify-content: center;
    }
  `;

  var [weatherCards, setWeatherCards] = useState([]);
  var [weatherIcons, setWeatherIcons] = useState([]);
  var [query, setQuery] = useState("");
  var [coordinates, setCoordinates] = useState({lat: 44.56, lon: -123.28}); 
  var [cityName, setCityName] = useState("");

  function validLatitude(lat) {
    return (lat >= -90 && lat <= 90);
  }

  function validLongitude(lon) {
    return (lon >= -180 && lon <= 180);
  }

  // load landing page items (weather icons, greeting, map?)
  useEffect(() => {
    var weatherTypes = ["Thunderstorm", "Snow", "Clear", "Clouds", "Rain"];
    var icons = [];
    for (var type of weatherTypes) {
      if (type === "Clouds") icons.push(<Weather key={type} symbol={type} description="few clouds"/>);
      else icons.push(<Weather key={type} symbol={type} description=""/>);
    }
    setWeatherIcons(icons);
  }, []);

  // fetch the forecast for given lat/lon values and populate weather cards
  useEffect(() => {
    if (validLatitude(coordinates.lat) && validLongitude(coordinates.lon)) {
      try {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("weather api result:", data);
          var cards = [];
          for (var i = 0; i < 7; i++) {
            var forecast = data["daily"][i];
            cards.push(
              <Card key={i} 
                    highTemp={forecast["temp"]["max"]} 
                    lowTemp={forecast["temp"]["min"]}
                    precipitation={forecast["pop"]}
                    description={forecast["weather"][0]["description"]}
                    weatherSymbol={forecast["weather"][0]["main"]}
                    date={forecast["dt"]}
              />);
          }
          setWeatherCards(cards);
        });
      } catch (e) {
        console.log("weather forecast api error:", e);
        alert("There was an error fetching the forecast:", e);
      }
    } 
  }, [coordinates]);

  function searchByCity(query) {
    console.log("Search by city:", query);
    setQuery(query);
  }

  // fetch city name and lat/lon values for city query
  useEffect(() => {
    if (query !== "") {
      try {
        fetch(`https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_GEO_API_KEY}&q=${query}`)
        .then(response => response.json())
        .then(data => {
          // console.log("geocoding api data:", data);
          setCoordinates({lat: data["results"][0]["bounds"]["northeast"]["lat"], lon: data["results"][0]["bounds"]["northeast"]["lng"]});
          setCityName( data["results"][0]["formatted"]);
        });
      } catch (e) {
        console.log("geocoding api error:", e);
        alert("There was an error locating your city:", e);
      }
    }
  }, [query]);

  return (
    <div css={styles}>
      <div>
        <Navbar />
        <div className="iconsContainer"> {weatherIcons} </div>
        <Search searchCity={searchByCity}/>
        <div className="container">
          {(cityName !== "") && (<h3>Weather Forecast for {cityName} </h3>)}
        </div>
        <div className="container">
          {(cityName !== "") && (<div className="cardContainer"> {weatherCards} </div>)}
        </div>
        <Map position={[coordinates.lat, coordinates.lon]}/>
      </div>
    </div>
    
  );
}
