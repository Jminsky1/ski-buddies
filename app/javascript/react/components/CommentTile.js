import React, { useState, useEffect } from "react"

const CommentTile = (props) => {
  return(
    <div className="callout secondary cell small-12">
      <p className="comments">Comment: {props.body} | Gnar Level: {props.gnar}</p>
    </div>
  )
}

export default CommentTile
