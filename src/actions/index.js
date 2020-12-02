// action types
export const SAVE_COMMENT = 'SAVE_COMMENT';

// to save comment
export const saveComment = (comment) => {
  return {
    type: SAVE_COMMENT,
    payload: comment
  }
}
