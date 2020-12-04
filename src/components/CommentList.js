import React from 'react';
import { connect } from 'react-redux';

const CommentList = ({ comments }) => {

  const renderComments = () => {
    return comments.map((comment, i) => <li key={i}>{comment}</li>);
  };

  return (
    <div>
      <ul>{renderComments()}</ul>
    </div>
  );
};

// mapStateToProps function passes global state data from Redux Store into react components 
// in order to do so, pass mapStateToProps to Connect function
// mapStateToProps, meaning - pass in the data store in Redux Store to this component as PROPS
const mapStateToProps = (state) => { // call with our entire global state object in Redux Store
  // we are going to return New object with property 'comments' as PROPS 
  // pass onto this react component through our comments reducer from STORE
  return { comments: state.comments } // new object key - key/value 
}

export default connect(mapStateToProps)(CommentList);
