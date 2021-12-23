import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WeatherData = ({ city }) => {
  // Save REACT_APP_OPENWEATHERMAP_API_KEY as openweather API key
  const api_key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (weather.length !== 0) {
    function degreeToCompass(degree) {
      if (
        (degree > 0 && degree < 11.25) ||
        (degree < 360 && degree > 360 - 11.25)
      ) {
        return 'N';
      } else if (degree >= 11.25 && degree < 45 - 11.25) {
        return 'NNE';
      } else if (degree >= 45 - 11.25 && degree < 45 + 11.25) {
        return 'NE';
      } else if (degree >= 45 + 11.25 && degree < 90 - 11.25) {
        return 'ENE';
      } else if (degree >= 90 - 11.25 && degree < 90 + 11.25) {
        return 'E';
      } else if (degree >= 90 + 11.25 && degree < 135 - 11.25) {
        return 'ESE';
      } else if (degree >= 135 - 11.25 && degree < 135 + 11.25) {
        return 'SE';
      } else if (degree >= 135 + 11.25 && degree < 180 - 11.25) {
        return 'SSE';
      } else if (degree >= 180 - 11.25 && degree < 180 + 11.25) {
        return 'S';
      } else if (degree >= 180 + 11.25 && degree < 225 - 11.25) {
        return 'SSW';
      } else if (degree >= 225 - 11.25 && degree < 225 + 11.25) {
        return 'SW';
      } else if (degree >= 225 + 11.25 && degree < 270 - 11.25) {
        return 'SSW';
      } else if (degree >= 270 - 11.25 && degree < 270 + 11.25) {
        return 'W';
      } else if (degree >= 270 + 11.25 && degree < 315 - 11.25) {
        return 'WNW';
      } else if (degree >= 315 - 11.25 && degree < 315 + 11.25) {
        return 'NW';
      } else {
        return 'NNW';
      }
    }

    return (
      <div>
        <h2>{`Weather of ${city}`}</h2>
        <p>
          <b>Temperature</b> {weather.main.temp} Celcius
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt='Weather'
        />
        <p>
          <b>
            Wind: {weather.wind.speed * 3.6} km/hr direction{' '}
            {degreeToCompass(`${weather.wind.deg}`)}
          </b>
        </p>
      </div>
    );
  }

  return <h2>No weather data available </h2>;
};

const SingularCountry = ({ countryInformation }) => {
  let languagesArray = Object.values(countryInformation.languages);
  let finalLanguageArray = [];

  languagesArray.map((language) =>
    finalLanguageArray.push(<li key={language}>{language}</li>)
  );

  return (
    <div key={countryInformation.name.common}>
      <h1>{countryInformation.name.common}</h1>
      {countryInformation.capital ? (
        <p>Capital: {countryInformation.capital[0]}</p>
      ) : (
        <p>No capital</p>
      )}
      <p>Population: {countryInformation.population}</p>
      <h2>Languages</h2>
      <ul key={countryInformation.name.common}>{finalLanguageArray}</ul>
      <img src={countryInformation.flags.png} alt='Flag' />
      {countryInformation.capital ? (
        <WeatherData city={countryInformation.capital[0]} />
      ) : (
        <h2>No weather data available</h2>
      )}
    </div>
  );
};

const SingleCountryData = ({ countryInformation }) => {
  const [showCountry, setShowCountry] = useState(false);

  if (showCountry) {
    let languagesArray = Object.values(countryInformation.languages);
    let finalLanguageArray = [];

    languagesArray.map((language) =>
      finalLanguageArray.push(<li key={language}>{language}</li>)
    );

    return (
      <div key={countryInformation.name.common}>
        <h1>
          {countryInformation.name.common}{' '}
          <button onClick={() => setShowCountry(!showCountry)}>Hide</button>
        </h1>
        {countryInformation.capital ? (
          <p>Capital: {countryInformation.capital[0]}</p>
        ) : (
          <p>No capital</p>
        )}
        <p>Population: {countryInformation.population}</p>
        <h2>Languages</h2>
        <ul key={countryInformation.name.common}>{finalLanguageArray}</ul>
        <img src={countryInformation.flags.png} alt='Flag' />
        {countryInformation.capital ? (
          <WeatherData city={countryInformation.capital[0]} />
        ) : (
          <h2>No weather data available</h2>
        )}
      </div>
    );
  }

  return (
    <div>
      {countryInformation.name.common}
      <button onClick={() => setShowCountry(!showCountry)}>Show</button>
    </div>
  );
};

const CountryData = ({ country, countryInformation }) => {
  if (country) {
    let realCountry = Object.values(country).join('').toLowerCase();
    let filterArray = countryInformation.map(
      (currentCountry) =>
        currentCountry.name.common.toLowerCase().indexOf(realCountry) > -1
    );
    let returnArray = [];
    filterArray.forEach((element, index) => {
      if (element) {
        returnArray = returnArray.concat(countryInformation[index]);
      }
    });

    if (returnArray.length > 0 && returnArray.length < 10) {
      if (returnArray.length > 1) {
        let singleCountry = returnArray.filter(
          (currentCountry) =>
            currentCountry.name.common.toLowerCase() === realCountry
        );

        if (singleCountry.length === 1) {
          return (
            <SingularCountry
              key={singleCountry[0].name.common}
              countryInformation={singleCountry[0]}
            />
          );
        }

        return returnArray.map((country) => (
          <SingleCountryData
            key={country.name.common}
            countryInformation={country}
          />
        ));
      }

      return returnArray.map((country) => (
        <SingularCountry
          key={country.name.common}
          countryInformation={country}
        />
      ));
    }

    if (returnArray.length > 10) {
      return <p>Too many matches found, please specify another filter</p>;
    }
  }

  return <p>No countries found</p>;
};

export default CountryData;
