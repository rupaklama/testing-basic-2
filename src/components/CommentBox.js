import React, { useState } from 'react';
import { connect } from 'react-redux';

// import { useDispatch } from 'react-redux';
import * as actions from '../actions';

const CommentBox = ({ saveComment }) => {
  const [comment, setComment] = useState();

  // useDispatch hook to dispatch an action creator
  // const dispatch = useDispatch();

  const handleChange = e => {
    setComment(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Todo - call action creator to save comment
    saveComment(comment);
    // console.log(comment);

    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add a Comment</h4>
      <textarea value={comment} onChange={handleChange} />

      <div>
        <button>Submit Comment</button>
      </div>
    </form>
  );
};

export default connect(null, actions)(CommentBox);
