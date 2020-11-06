import React, { useState, useEffect } from "react"

const CommentForm = (props) => {

  const [newComment, setNewComment] = useState({
    body: "",
    gnar: ""
  })

  const handleChange = (event) => {
    setNewComment({
      ...newComment,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNewCommentFunction(newComment)
    setNewComment({
      body: "",
      gnar: ""
    })
  }
  return (
    <form className="new-comment-form callout" onSubmit={handleSubmit}>
      <label className="comment-label">
        Comments:
        <input
          name="body"
          id="body"
          type="text"
          onChange={handleChange}
          value={newComment.body}
        />
      </label>

      <label className="comment-label">
        Gnar:
        <input
          name="gnar"
          id="gnar"
          type="number"
          onChange={handleChange}
          value={newComment.gnar}
        />
      </label>

      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default CommentForm
