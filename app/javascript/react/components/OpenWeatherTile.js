import React, { useState, useEffect } from 'react';

const OpenWeatherTile = (props) => {

  return (
    <div className="callout weather-container">
      <h1>{props.weather.date}</h1>
      <ul>
        <li className='weather'><img src={`http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`} /></li>
        <li className='weather'>Conditions: {props.weather.conditions}</li>
        <li className='weather'>description: {props.weather.description}</li>
        <li className='weather'>Current Temperature: {Math.round((props.weather.currentTemp- 273.15) * 9/5 + 32)}&deg;F</li>
        <li className='weather'>High Temperature: {Math.round((props.weather.highTemp - 273.15) * 9/5 + 32)}&deg;F</li>
        <li className='weather'>Low Temperature: {Math.round((props.weather.lowTemp - 273.15) * 9/5 + 32)}&deg;F</li>
        <li className='weather'>Wind: {Math.round(props.weather.wind)}mph</li>
        <li className='weather'>Visibility: {props.weather.visibility}</li>
      </ul>
    </div>
  )
}

export default OpenWeatherTile