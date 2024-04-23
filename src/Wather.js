import React, { useEffect, useState } from "react";
import WatherCard from "./WatherCard";

const Wather = () => {
  const appid = "736ceb19370c4023556ca6f4f8bae9f0";
  const [searchValue, setSearchValue] = useState("Delhi");
  const [tempInfo, settempInfo] = useState({});
  const getWatherIndo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${appid}`;

      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: wathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWatherInfo = {
        temp,
        humidity,
        pressure,
        wathermood,
        name,
        speed,
        country,
        sunset,
      };

      settempInfo(myNewWatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWatherIndo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWatherIndo}
          >
            Search
          </button>
        </div>
      </div>
      <WatherCard {...tempInfo} />
    </>
  );
};

export default Wather;
