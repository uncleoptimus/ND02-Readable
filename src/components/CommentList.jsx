// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Comment
  // Divider,
  // Header,
  // Icon,
  // List,
  // Statistic,
} from 'semantic-ui-react';

import ListDisplayControls from './ListDisplayControls';
import CommentItem from './Comment';

import { setSortDirection, setSortFilter } from '../actions/listFilter';

import { loadComments, updateScore } from '../actions/comments';

type CommentListProps = {
  post_id: string,
  comments: Array<any>,
  loadComments: string => void,
  sortDirection: string,
  sortFilter: string,
  setFilter: () => mixed,
  setDirection: () => mixed,
  updateVoteScore: (string, string) => void
};

class CommentList extends Component<CommentListProps> {
  componentWillMount() {
    const { post_id, loadComments } = this.props;
    loadComments(post_id);
  }

  sortedList = () => {
    const { comments, sortFilter, sortDirection } = this.props;

    switch (`${sortFilter}-${sortDirection}`) {
      case 'time-asc':
        return comments.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return 1;
          else if (a.timestamp === b.timestamp) return 0;
          else return -1;
        });
      case 'time-desc':
        return comments.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return -1;
          else if (a.timestamp === b.timestamp) return 0;
          else return 1;
        });
      case 'score-asc':
        return comments.sort((a, b): number => {
          if (a.voteScore > b.voteScore) return 1;
          else if (a.voteScore === b.voteScore) return 0;
          else return -1;
        });
      default:
        return comments.sort((a, b): number => {
          if (a.voteScore > b.voteScore) return -1;
          else if (a.voteScore === b.voteScore) return 0;
          else return 1;
        });
    }
  };

  render() {
    const {
      sortFilter,
      sortDirection,
      setFilter,
      setDirection,
      updateVoteScore
    } = this.props;

    return (
      <div className="comment-list">
        <ListDisplayControls
          direction={sortDirection}
          filter={sortFilter}
          options={['score', 'time']}
          onDirectionChange={setDirection}
          onFilterChange={setFilter}
        />
        <Comment.Group size="large">
          {this.sortedList().map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              updateVoteScore={updateVoteScore}
            />
          ))}
        </Comment.Group>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const commentList = Object.keys(state.comments).map(
    comment_id => state.comments[comment_id]
  );
  const comments = props.post_id
    ? commentList.filter(comment => props.post_id === comment.parentId)
    : commentList;

  return {
    comments,
    sortDirection: state.listFilter.sortDirection,
    sortFilter: state.listFilter.sortFilter
  };
};

const mapDispatchToProps = dispatch => ({
  loadComments: post_id => dispatch(loadComments(post_id)),
  setDirection: selectedDirection =>
    dispatch(setSortDirection(selectedDirection)),
  setFilter: selectedFilter => dispatch(setSortFilter(selectedFilter)),
  updateVoteScore: (comment_id: string, vote: 'upVote' | 'downVote') =>
    dispatch(updateScore(comment_id, { option: vote }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
