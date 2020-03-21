import React, { Component } from "react";
import { Grid, Header, Image, Dropdown } from "semantic-ui-react";
import ic_launcher from "../../images/ic_launcher.png";
import firebase from "../../firebase";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };

  showOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignOut}>Sign Out</span>
    }
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out"));
  };

  render() {
    const { user } = this.state;
    return (
      <Grid style={{ backgroud: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Image src={ic_launcher} size="tiny" />
              <Header.Content>SpawN AI</Header.Content>
            </Header>
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar/>
                    {user.displayName}
                  </span>
                }
                options={this.showOptions()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
