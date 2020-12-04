import React, { useState } from 'react';
// import { connect } from 'react-redux';

import { useDispatch } from 'react-redux';
import { fetchComments, saveComment } from '../actions';
// import * as actions from '../actions';

const CommentBox = () => {
  const [comment, setComment] = useState();

  // useDispatch hook to dispatch an action creator
  const dispatch = useDispatch();

  const handleChange = e => {
    setComment(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Todo - call action creator to save comment
    dispatch(saveComment(comment))
    // console.log(comment);

    setComment('');
  };

  // call action creator to fetch comments
  const handleFetch = () => {
    dispatch(fetchComments())
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Add a Comment</h4>
        <textarea value={comment} onChange={handleChange} />

        <div>
          <button>Submit Comment</button>
        </div>
      </form>

      <hr />
      {/** adding className to button here for selecting/testing this specific button */}
      <button className='fetch-comments' onClick={handleFetch}>Fetch Comments</button>
    </div>
  );
};

// export default connect(null, actions)(CommentBox);
export default CommentBox;
