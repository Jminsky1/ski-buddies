import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'

import _ from 'lodash'

import ErrorList from './ErrorList'

const MountainsFormContainer = (props) => {
  const [submittedMountain, setSubmittedMountain] = useState({
    name: "",
    location: "",
    size: "",
    description: "",
    zip_code: "",
    image: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState({
    redirect: false,
    id: ""
  })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)

  const handleFileUpload = (acceptedFiles) => {
    setSubmittedMountain({
      ...submittedMountain,
      image: acceptedFiles[0]
    })
  }

  const validforSubmission = () => {
    let submittedErrors = {}
    const requiredFields = ["name", "location", "size", "zip_code"]
    requiredFields.forEach(field => {
      if (submittedMountain[field].trim() === "") {
        submittedErrors = {
          ...submittedErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submittedErrors)
    return _.isEmpty(submittedErrors)
  }

  const inputChangeHandler = (event) => {
    setSubmittedMountain({
      ...submittedMountain,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onClickHandler = (event) => {
    event.preventDefault()
    let mountain = new FormData()
    mountain.append("mountain[name]", submittedMountain.name)
    mountain.append("mountain[location]", submittedMountain.location)
    mountain.append("mountain[size]", submittedMountain.size)
    mountain.append("mountain[description]", submittedMountain.description)
    mountain.append("mountain[zip_code]", submittedMountain.zip_code)
    mountain.append("mountain[mountain_picture]", submittedMountain.image)

    if (validforSubmission()) {
      fetch('/api/v1/mountains.json', {
        method: "POST",
        body: mountain,
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Accept': 'image/jpeg'
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.errors) {
          const requiredFields = ["name", "location", "size", "zip_code"]
          requiredFields.forEach(field => { 
            if (body.errors[field] !== undefined) {
              setErrors({
                ...errors,
                [field]: body.errors[field][0]
              })
            }
          })
        }else if (body.error) {
          setError(body.error)
        }else{
          setShouldRedirect({
            redirect: true,
            id: body.id
          })
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  if (shouldRedirect.redirect) {
    return <Redirect to={`/mountains/${shouldRedirect.id}`}/>
  }

  return(
    <div>
      <div>
        <p className="callout secondary cell small-6">To add a new mountain please enter name, location, zip code and elevation!</p>
      </div>
      
      <div className="field">
        <form onSubmit={onClickHandler}>
          <ErrorList errors={errors}
          error={error} />

          <label>
            Name
            <input 
              name="name"
              id="name"
              type="text"
              onChange={inputChangeHandler}
              value={submittedMountain.name}
              />
          </label>

          <label>
            Location
            <input 
              name="location"
              id="location"
              type="text"
              onChange={inputChangeHandler}
              value={submittedMountain.location}
              />
          </label>

          <label>
            Zip Code
            <input 
              name="zip_code"
              id="zip_code"
              type="text"
              onChange={inputChangeHandler}
              value={submittedMountain.zip_code}
              />
          </label>

          <label>
            Elevation (in feet)  
            <input 
              name="size"
              id="size"
              type="text"
              onChange={inputChangeHandler}
              value={submittedMountain.size}
              />
          </label>

          <label>
            Description  
            <input 
              name="description"
              id="description"
              type="text"
              onChange={inputChangeHandler}
              value={submittedMountain.description}
              />
          </label>

          <Dropzone onDrop={handleFileUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Click to upload a mountain picture</p>
                </div>
              </section>
            )}
          </Dropzone>

          <input
            type="submit"
            value="Add New Mountain"
          />
      </form>
      </div>
    </div>
  )
}

export default MountainsFormContainer
