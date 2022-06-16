import React from "react";

const Weather = ({country, temperature, icon, wind}) => {
    return(
        <>
            <h3>Weather in {country}</h3>
            <p>temperature {temperature}</p>
            <img alt="weather-icon" src={icon}/>
            <p>Wind {wind}</p>
        </>
    )
}

export default Weather