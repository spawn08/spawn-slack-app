import React, { Component } from "react";
import mime from "mime-types";
import { Modal, Input, Icon, Button } from "semantic-ui-react";

export default class FileModal extends Component {
  state = {
    file: null,
    authorized: ["image/jpeg", "image/png"]
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;

    if (file !== null) {
      console.log(this.isAuthorize(file.name));

      if (this.isAuthorize(file.name)) {
        console.log(file);
        const medatadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, medatadata);
        closeModal();
        this.clearFile();
      }
    }
  };

  clearFile = () => this.setState({ file: null });

  isAuthorize = name => this.state.authorized.includes(mime.lookup(name));

  render() {
    const { modal, closeModal } = this.props;

    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select an Image file</Modal.Header>
        <Modal.Content>
          <Input
            onChange={this.addFile}
            fluid
            label="File types: jpeg,png"
            name="file"
            type="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.sendFile}>
            <Icon name="checkmark" /> Send
          </Button>

          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
