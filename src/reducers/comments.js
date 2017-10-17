// @flow

import * as actions from '../actions/actionTypes';

type CommentAction = {
  type: String,
  comments?: Array<any>,
  commentData?: any
};

const commentsReducer = (state: any = {}, action: CommentAction) => {
  switch (action.type) {
    case actions.COMMENTS_LOADED:
      return action.comments.reduce((commentCache, comment) => {
        commentCache[comment.id] = comment;
        return commentCache;
      }, {});
    case actions.NEW_COMMENT:
      return { ...state, [action.commentData.id]: action.commentData };
    case actions.UPDATE_COMMENT_SCORE:
      return { ...state, [action.commentData.id]: action.commentData };
    default:
      return state;
  }
};

export default commentsReducer;
