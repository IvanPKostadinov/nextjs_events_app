import { useState, useEffect, useContext } from 'react';

import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((data) => {
            throw new Error("Couldn't load the comments");
          });
        })
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        })
        .catch((error) => {
          setIsFetchingComments(false);
          notificationCtx.showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error',
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    console.log({ commentData });

    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored.',
      status: 'pending',
    });

    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error("Couldn't add new comment!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully added a comment.',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {(showComments && !isFetchingComments) && <CommentList items={comments} />}
      {(showComments && isFetchingComments) && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
