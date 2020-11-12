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
  const [currentUser, setCurrentUser] = useState({})
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
      setMountain(responseBody)
      setComments(responseBody.comments)
      if (responseBody.currentUser != null) {
        setCurrentUser(responseBody.currentUser)
      }
      setWeather({
        name: responseBody.name,
        description: responseBody.weather.description,
        icon: responseBody.weather.icon,
        conditions: responseBody.weather.conditions,
        currentTemp: responseBody.weather.temp,
        highTemp:responseBody.weather.high,
        lowTemp: responseBody.weather.low,
        wind: responseBody.weather.wind,
        date: responseBody.weather.date,
        visibility: responseBody.weather.visibility,
        snow: responseBody.weather.snow
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
        debugger
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

  const editComment = (commentObject) => {
    const commentId = commentObject.commentId
    debugger
    fetch(`/api/v1/mountains/${id}/comments/${commentId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(commentObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then((updatedComment) => {
      if (!updatedComment.errors) {
        let commentIndex = comments.findIndex((comment) => 
        
        comment.id === updatedComment.id
        );

        let tempComments = [...comments];
        tempComment.splice(commentIndex, 1, updatedComment);
        setComments(tempComments);

      } else if (updatedComment.errors) {
        setErrors(updatedComment.errors);
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const deleteComment = (payload) => {
    const commentId = payload.commentId

    fetch(`/api/v1/mountains/${id}/comments/${commentId}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then((removeComment) => {
      if (!removeComment.errors) {
        let commentIndex = comments.findIndex(
          (comment) => comment.id === removeComment.id
        );
        let tempComments = [...comments];
        tempComments.splice(commentIndex, 1);
        setComments(tempComments);

      } else if (removeComment.errors) {
        setErrors(removeComment.errors);
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };
  
  return (
    <div>
      <MountainShow
        id={mountain.id}
        name={mountain.name}
        location={mountain.location}
        size={mountain.size}
        description={mountain.description}
        zip_code={mountain.zip_code}
        mountain_picture={mountain.mountain_picture}
      />

      <h2 className="plan">Plan Ski Trips!</h2>
      
      <div className="calendar"> 
        <Calendar
        /> 
      </div>
      
      <div className='weather'>
        < OpenWeatherTile
        key={mountain.id}
        weather={weather}
        />
        </div>
        
        <h2 className="comment-label-header">Comments:</h2>
        
        <CommentList
        mountainComments={comments}
        currentUser={currentUser}
        editComment={editComment}
        deleteComment={deleteComment}
        />

        <CommentErrorList errors={errors} 
        error={error}/>
        <CommentForm addNewCommentFunction={addNewComment} />
      </div>
      )
    }

export default MountainShowContainer 