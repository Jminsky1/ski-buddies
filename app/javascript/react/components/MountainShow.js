import React from "react"

const MountainShow = (props) => {
  let picture
  if(props.mountain_picture){
    if(props.mountain_picture.url !== null){
      picture = <img className="padded" src={props.mountain_picture.url} alt="mountain picture" />
    }
  }
  return(
   
    <div className="tile">
      <div className = "grid-x grid-margin-x">
        <div className = "small-6 columns">
          <h2 className="field">{props.name}</h2>
          <h5 className="field">{props.location} </h5>
          <h5 className="field">Elevation:{props.size} </h5>
          <p className="field">{props.description} </p>
        </div>
        <div className="small-6 columns">
          {picture}
        </div>
      </div>
    </div>
  )
}
export default MountainShow