import React, { Component } from "react";
import { Segment, Button, Input, ButtonGroup } from "semantic-ui-react";
import firebase from "../../firebase";
import "../App.css";

export default class MessageForm extends Component {
  state = {
    message: "",
    loading: false,
    errors: [],
    channel: this.props.currentChannel,
    currentUser: this.props.currentUser
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = () => {
    const { currentUser } = this.state;
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      },
      content: this.state.message
    };

    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };

  render() {
    const { errors, message, loading } = this.state;
    return (
      <Segment className="message_form">
        <Input
          fluid
          onChange={this.handleChange}
          name="message"
          style={{ marginBottom: "0.5em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
          placeholder="Write your message"
          value={message}
        />

        <ButtonGroup icon widths="2">
          <Button
            color="orange"
            onClick={this.sendMessage}
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            disabled={loading}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </ButtonGroup>
      </Segment>
    );
  }
}
