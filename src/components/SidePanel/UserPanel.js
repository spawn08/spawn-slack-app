import React, { Component } from "react";
import { Grid, Header, Image, Dropdown } from "semantic-ui-react";
import ic_launcher from "../../images/ic_launcher.png";
import firebase from '../../firebase';

export default class UserPanel extends Component {
  showOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
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
  }

  render() {
    return (
      <Grid style={{ backgroud: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Image src={ic_launcher} size="tiny" />
              <Header.Content>SpawN AI</Header.Content>
            </Header>
          </Grid.Row>

          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>User</span>}
              options={this.showOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}
