import React, { useState, useEffect } from "react"
import _ from 'lodash'
import EditCommentTile from "./EditCommentTile"
import DeleteCommentTile from "./DeleteCommentTile"

const CommentTile = (props) => {
  const[showEditTile, setShowEditTile] = useState(false);
  const [showDeleteTile, setShowDeleteTile] = useState(false);

  const editClickHandler = (event) => {
    setShowEditTile(true);
    setShowDeleteTile(false);
  };

  const deleteClickHandler = (event) => {
    setShowDeleteTile(true);
    setShowEditTile(false);
  }

  const discardClickHandler = (event) => {
    setShowEditTile(false);
  };

  const discardDeleteClickHandler = (event) => {
    setShowDeleteTile(false);
  };

  const saveEditClickHandler = (payload) => {
    setShowEditTile(false);
    props.editComment(payload);
  };

  const confirmDeleteClickHandler = (event) => {
    props.deleteComment(event);
  };

  let displayTile = null;
  if (showEditTile && !showDeleteTile){
    displayTile = (
      <EditCommentTile
      comment={props.comment}
      editComment={saveEditClickHandler}
      discardClickHandler={discardClickHandler}
      />
    );
  }else if (showDeleteTile && !showEditTile) {
    displayTile = (
      <DeleteCommentTile
      comment={props.comment}
      deleteComment={confirmDeleteClickHandler}
      discardDeleteClickHandler={discardDeleteClickHandler}
      />
    );
  }else{
    displayTile=(
      null
    )
  }

  let editDeleteButtons = null;

  // if (props.comment.signed_in_user === props.comment.user) {
    editDeleteButtons = (
      <>
        <button 
        type="button"
        value="Edit"
        className="button"
        id="edit-comment"
        onClick={editClickHandler}
        >Edit</button>

        <button
        type="button"
        value="Delete"
        className="button"
        id="delete-comment"
        onClick={deleteClickHandler}
        >Delete</button>
      </>
    )
  // }



  
  return(
    <div className="callout secondary cell small-12">
      <p className="comments">Comment: {props.comment.body} | Gnar Level: {props.comment.gnar} | {editDeleteButtons}</p>
      <div>{displayTile}</div>
    </div>
  )
}

export default CommentTile
