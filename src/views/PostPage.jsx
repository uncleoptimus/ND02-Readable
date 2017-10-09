// @flow

import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  // Button,
  // Container,
  // Divider,
  Grid,
  Header,
  // Icon,
  // Image,
  // List,
  // Menu,
  // Segment,
  Statistic,
  // Visibility,
} from 'semantic-ui-react'

import formatTime from '../utils/formatTime'

import CommentCreator from '../components/CommentCreator'
// import PostList from '../components/PostList'

import { loadComments } from '../actions/comments'


type PostItem = {
  body: string,
  category: string,
  voteScore: number,
  title: string,
  id: string,
  timestamp: number,
  author: string,
};

const emptyPost = {
  body: '',
  category: '',
  voteScore: 0,
  title: '',
  id: '',
  timestamp: 0,
  author: '',
}

type PostPageProps = {
  post_id: string,
  comments: any,
  post: PostItem,
  loadComments: (string) => void,
}

// const PostPage = ({ comments, post = emptyPost }: { comments: any, post: PostItem }) => {
class PostPage extends React.Component<PostPageProps> {
  componentWillMount() {
    const { post_id, loadComments } = this.props

    loadComments(post_id)
  }

  render() {
    const { comments, post } = this.props

     return (
        <div className="post-page">
          <Header size="small" textAlign="left" content={`/${post.category}`} />

          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <Header size="huge" content={post.title} />
                <Header sub size="small" content={`submitted on ${formatTime(post.timestamp)} by ${post.author}`} dividing />
              </Grid.Column>

              <Grid.Column width={4} textAlign="center">
                <Statistic size="large" value={post.voteScore} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <p>
            {post.body}
          </p>

          <h1>The comments:</h1>
          {comments.map(comment => <div key={comment.id}>{comment.id}</div>)}
          <hr />

          <CommentCreator parentId={post.id} />
        </div>
      );
  }
}

const mapStateToProps = (state, props) => {
  const post_id = props.match.params.post_id
  let post = emptyPost

  if (state.posts.length) {
    post = {...state.posts.find(post => post.id === post_id )}
    // TODO: if post doesn't exist show an error page...
  }

  const comments = state.comments

  console.log('post page...', state, post)

  return ({
    post_id,
    post,
    comments,
  })
}

const mapDispatchToProps = dispatch => ({
  // createPost: (postData) => dispatch(newPost(postData))
  loadComments: (post_id) => dispatch(loadComments(post_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
// export default PostPage
