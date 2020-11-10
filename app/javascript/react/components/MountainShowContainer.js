import React, { useState, useEffect } from "react";
import MountainShow from "./MountainShow";
import _ from "lodash" ;
import CommentList from "./CommentList";
import CommentErrorList from "./CommentErrorList";
import CommentForm from "./CommentForm";
import Calendar from "./Calendar";
import OpenWeatherTile from "./OpenWeatherTile"

const MountainShowContainer = (props) => {
  const [mountain, setMountain] = useState({})
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [comments, setComments] = useState(null)
  const [weather, setWeather] = useState({
    name: '',
    description: '',
    icon: '',
    conditions:  '',
    currentTemp: '',
    highTemp: '',
    lowTemp: '',
    wind: '',
    date: ''
  })
  const id = props.match.params.id 

  useEffect(() => {
    fetch(`/api/v1/mountains/${id}`, {
      credentials: "same-origin"
    })
      .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
      })
      .then((responseBody) => {
        debugger
        setMountain(responseBody.mountain)
        setComments(responseBody.comments)
        setWeather({
          name: responseBody.name,
          description: responseBody.weather.description,
          icon: responseBody.weather.icon,
          conditions: responseBody.weather.conditions,
          currentTemp: responseBody.weather.temp,
          highTemp:responseBody.weather.high,
          lowTemp: responseBody.weather.low,
          wind: responseBody.weather.wind,
          date: responseBody.weather.date
        })
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const validforSubmission = (submittedComment) => {
    let submittedErrors = {}
    const requiredFields = ["body"]
    requiredFields.forEach(field => {
      if (submittedComment[field].trim() === "") {
        submittedErrors = {
          ...submittedErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submittedErrors)
    return _.isEmpty(submittedErrors)
  }
  const addNewComment = (newCommentObject) => {
    event.preventDefault() 
    if (validforSubmission(newCommentObject)) {
      fetch(`/api/v1/mountains/${id}/comments.json`, {
        method: "POST",
        body: JSON.stringify(newCommentObject),
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.errors) {
          const requiredFields = ["body"]
          requiredFields.forEach(field => { 
            if (body.errors[field] !== undefined) {
              setErrors({
                ...errors,
                [field]: body.errors[field][0]
              })
            }
          })
        }else if(body.error){
          setError(body.error[0])
        }else {
          setComments([
            ...comments,
            body
          ])
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }
  
  return (
    <div>
      <MountainShow
        id={mountain.id}
        name={mountain.name}
        location={mountain.location}
        size={mountain.size}
        description={mountain.description}
        mountain_picture={mountain.mountain_picture}
      />

      <h2>Plan Ski Trips!</h2>
      <Calendar
      /> 
       <div className='weather'>
          < OpenWeatherTile
            key={mountain.id}
            weather={weather}
          />
        </div>
      <h2 className="comment-label-header">Comments:</h2>
      <CommentList
        mountainComments={comments}
      />
      <CommentErrorList errors={errors} 
      error={error}/>
      <CommentForm addNewCommentFunction={addNewComment} />
    </div>
  )
}

export default MountainShowContainer 