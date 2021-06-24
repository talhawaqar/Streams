import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '983106032048-do5idfor4pl3g9abvifjk2f38rkvu5ps.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    }
    else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    }
    else if (this.props.isSignedIn) {
      return (
        <div onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign out
        </div>
      );
    }
    else {
      return (
        <div onClick={this.onSignInClick} className="ui green google button">
          <i className="google icon"></i>
          Sign In
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStatesToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStatesToProps, { signIn, signOut })(GoogleAuth);
