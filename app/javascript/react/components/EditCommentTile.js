import React, { useState } from "react";
import CommentErrorList from "./CommentErrorList"

const EditCommentTile = (props) => {
  const [comment, setComment] = useState({
    commentId: props.comment.id,
    body: props.comment.body,
    gnar: props.comment.gnar
  });

  const [errors, setErrors] = useState({})
  const handleChange = event => {
    setComment({
      ...comment,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ['body']

    requiredFields.forEach(field => {
      if (comment[field].trim() === '') {
        submitErrors = {
          ...submitErrors,
          [field]: 'is blank'
        }
      }
    });
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
};

const handleSubmit = event => {
  event.preventDefault();
  if(validForSubmission()) {
    props.editComment(comment);
    setComment({
      body: '',
      gnar: ''
    })
  }
}

return (
  <form onSubmit={handleSubmit}className='new-comment-form callout'>
    <h3>Edit Comment</h3>
    <CommentErrorList errors={errors} />
    <label>
      Title:
      <input
        name='body'
        id='body'
        type='text'
        onChange={handleChange}
        value={comment.body}
      />
    </label>
    <label>
      Gnar:
      <input
        name='gnar'
        id='gnar'
        type='text'
        onChange={handleChange}
        value={comment.gnar}
      />
    </label>
    <div className='button-group'>
      <input className='button' type='submit' value='Submit' />
    </div>
  </form>
);
};

export default EditCommentTile