import { useRef, useContext } from 'react';

import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter...',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      // here we add email: ..., because this is what the handler() expects in api/newsletter.js
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        // This is how we throw an error in .then().catch() and still get the data:
        return response.json().then((data) => {
          // this will make it into the .catch() block:
          throw new Error(data.error || "Couldn't register.");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: "You've successfully registered for newsletter!",
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
