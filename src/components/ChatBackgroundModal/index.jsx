import React from 'react';
import { Button,  Modal } from 'semantic-ui-react'

export const ChatBackgroundModal = ({ open, setOpen }) => {
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        
        open={open}
      >
        <Modal.Header>Chat wallpaper Configuration</Modal.Header>
        <Modal.Content>
          <h1>You can upload here</h1>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Back
          </Button>
          <Button
            content="Done"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};
