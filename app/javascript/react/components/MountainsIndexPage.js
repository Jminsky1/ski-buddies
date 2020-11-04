import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const MountainsIndexPage = (props) => {
  const [mountains, setMountains] = useState([])

  useEffect(() => {
    fetch("/api/v1/mountains.json", {
      credentials: "same-origin"
    })
    .then (response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setMountains(body) 
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let mountainListItems = mountains.map((mountain) => {
    debugger
    let picture = <img className="picture" src={mountain.mountain_picture.url} alt="mountain picture" />
    
    return (
    <div className="callout secondary cell small-4"> 
      <Link to={`/mountains/${mountain.id}`}>
         <h2 className="title" >{mountain.name} ({mountain.location})</h2>
        <div>{picture}</div>
      </Link>
    </div>)
  })

  return (
    <div>
    <div className="grid-x grid-margin-x">
        {mountainListItems} 
    </div> 
    <div>
    <Link className="big" to={`/mountains/new`}>Add a New Mountain </Link>
    </div>
    </div>
  )
}

export default MountainsIndexPage