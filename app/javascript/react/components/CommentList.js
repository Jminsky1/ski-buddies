import React from "react"
import CommentTile from  "./CommentTile"

const CommentList = (props) => {
  let commentTiles 
  if(props.mountainComments){
    commentTiles = props.mountainComments.map ((comment) => {
      return ( <CommentTile
        key={comment.id}
        id={comment.id}
        body={comment.body}
        gnar={comment.gnar}
      />
      )
    })
  }
  
  return (
    <div className="grid-x grid-margin-x">
      {commentTiles}
    </div>
  )
}
  export default CommentList