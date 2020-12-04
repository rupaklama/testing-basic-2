import Axios from 'axios';

// action types
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

// to save comment
export const saveComment = comment => {
  return {
    type: SAVE_COMMENT,
    payload: comment,
  };
};

// to fetch comments from json place holder api
export const fetchComments = () => async dispatch => {
  const { data } = await Axios.get(
    'https://jsonplaceholder.typicode.com/comments'
  );

  // dispatch to reducer
  dispatch({
    type: FETCH_COMMENTS,
    payload: data,
  });
};
