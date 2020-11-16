import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favoriteMountains, setFavoriteMountains] = useState([])
  useEffect(() => {
    fetch("/api/v1/favorites", {
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
     setFavoriteMountains(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let favoriteMountainsListItems = favoriteMountains.map((favoriteMountain) => {
  return(
    {favoriteMountain}
    )
  })

  return(
    <div>
    {favoriteMountainsListItems}
    </div>
  )
}

export default Favorites