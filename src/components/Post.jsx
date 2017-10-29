// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Header, List, Statistic } from 'semantic-ui-react';

import ScoreDisplay from '../components/ScoreDisplay';

import { deletePost, updateScore } from '../actions/posts';

import formatTime from '../utils/formatTime';

type PostItem = {
  category?: string,
  voteScore?: number,
  title?: string,
  id: string,
  timestamp: string,
  author?: string
};

type PostProps = {
  post: PostItem,
  updateVoteScore: (string, string) => void
};

class Post extends Component<PostProps> {
  styles = {
    container: {
      // marginBottom: '1rem',
    },
    score: {
      textAlign: 'right'
    }
  };

  scoreUpdateHandler = event => {
    const { post, updateVoteScore } = this.props;

    document.activeElement && document.activeElement.blur();

    // dispatch vote score update
    updateVoteScore(post.id, event.currentTarget.value);
  };

  render() {
    const { post } = this.props;

    return (
      <List.Item style={this.styles.container}>
        <Divider />

        <ScoreDisplay
          customStyles={{ float: 'left' }}
          score={post.voteScore}
          size="tiny"
          updateScore={this.scoreUpdateHandler}
        />

        <Link to={`/post/${post.id}`}>
          <List.Content>
            <List.Header>
              <Header content={post.title} />
            </List.Header>

            <List.Description>
              posted {formatTime(post.timestamp)} by {post.author}
            </List.Description>
          </List.Content>
        </Link>
      </List.Item>
    );
  }
}

const mapStateToProps = (state, props) => {
  // const post_id = props.match.params.post_id;
  // let post = state.posts[post_id] || emptyPost;
  // return {
  //   comment_count: Object.keys(state.comments).length,
  //   post_id,
  //   post
  // };
};

const mapDispatchToProps = dispatch => ({
  // deletePost: (post_id: string) => dispatch(deletePost(post_id)),
  updateVoteScore: (post_id: string, vote: 'upVote' | 'downVote') =>
    dispatch(updateScore(post_id, { option: vote }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);

// export default Post;
