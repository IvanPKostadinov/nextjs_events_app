import { useState } from 'react';
import CommentList from './comment-list';

import classes from './comments.module.css';
import NewComment from './new-comment';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    console.log({commentData});
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
