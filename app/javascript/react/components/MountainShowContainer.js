import React, { useState, useEffect } from "react"
import MountainShow from "./MountainShow"
import _ from "lodash" 
import { checkPropTypes } from "prop-types"

const MountainShowContainer = (props) => {
  const [mountain, setMountain] = useState({})
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
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }, [])
  
  
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
      
    </div>
  )
}

export default MountainShowContainer 