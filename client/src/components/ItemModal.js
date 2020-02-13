import React, { useState } from 'react'
import { addItemAction } from '../actions/itemActions'
import { useDispatch } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

export default function ItemModal() {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});

  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  }

  const onChange = e => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    if (!item.name) {
      toggle()
    } else {
      dispatch(addItemAction(item))
      setItem({ amount: 1 })
      toggle()
    }
  }

  const content = (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={toggle}
      >
          Add Item
      </Button>

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                placeholder="Add item..."
                name="name"
                id="itemName"
                onChange={onChange} 
              />
              <Input
                style={{ marginTop: '2rem' }}
                type="number"
                placeholder="Amount"
                name="amount"
                id="itemAmount"
                onChange={onChange} 
              />
              <Button
                style={{ marginTop: '2rem' }}
                block
                color="dark"
                onClick={onSubmit}
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        
        
      </Modal>
    </div>
  );
  
  return (
    <div>
      {content}
    </div>
  )
}
