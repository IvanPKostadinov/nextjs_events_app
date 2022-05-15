import { Fragment } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Notification title='Test' message='This is a test' status='pending' />
    </Fragment>
  );
}

export default Layout;
