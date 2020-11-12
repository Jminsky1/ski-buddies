import React from "react";

const DeleteCommentTile = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let commentObject = { 
      commentId: props.comment.id, 
      comment: props.comment 
    };
    props.deleteComment(commentObject);
  };

  return (
    <div className='callout'>
      <h4>{props.comment.body}</h4>
      <p>{props.comment.gnar}</p>
        <button
          className="button"
          type="button"
          onClick={handleSubmit}
        >
         Delete
        </button>
        <button
          className="button delete-button"
          type="button"
          onClick={props.discardDeleteClickHandler}
        >
         Keep
        </button>
      </div>
  );
};

export default DeleteCommentTile;