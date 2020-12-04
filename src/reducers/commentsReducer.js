import { FETCH_COMMENTS, SAVE_COMMENT } from "../actions";

const commentsReducer = (state=[], action) => {
  switch (action.type) {
    case SAVE_COMMENT:
      return [ ...state, action.payload]
    case FETCH_COMMENTS:
      // adding only name property of array of objects as a comment from fetched data
      const names = action.payload.map(comment => comment.name)
      return [ ...state, ...names] // prev comments + new comments 
    default:
      return state;
  }
}

export default commentsReducer;
