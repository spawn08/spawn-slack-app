import React, { Component } from "react";
import { Segment, Button, Input, ButtonGroup } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import uuidv4 from "uuid/v4";
import "../App.css";

export default class MessageForm extends Component {
  state = {
    message: "",
    loading: false,
    errors: [],
    channel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    modal: false,
    uploadState: "",
    uploadTask: null,
    storageRef: firebase.storage().ref(),
    percentUpload: 0
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      }
    };

    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = this.state.message;
    }

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

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.messagesRef;
    const filePath = `chat/public/${uuidv4()}.jpg`;
    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          'state_changed',
          snap => {
            const percentUpload = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            this.setState({ percentUpload });
          },
          err => {
            console.log(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null
            })
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch(err => {
                console.log(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (downloadUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(downloadUrl))
      .then(() => {
        this.setState({ uploadState: 'done ' });
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: this.state.errors.concat(err) });
      });
  };

  render() {
    const { errors, message, loading, modal } = this.state;
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
            onClick={this.openModal}
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
          <FileModal
            modal={modal}
            closeModal={this.closeModal}
            uploadFile={this.uploadFile}
          />
        </ButtonGroup>
      </Segment>
    );
  }
}
