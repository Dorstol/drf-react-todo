import React, {useState} from 'react';
import TodoDataService from "../services/todos";
import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function AddTodo(props) {
  let editing = false;
  let initialTodoTile = '';
  let initialTodoMemo = '';
  const token = localStorage.getItem('token')
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [submitted, setSubmitted] = useState(false);


  if (props.location && props.location.state && props.location.state.currentTodo) {
    editing = true;
    initialTodoTile = props.location.state.currentTodo.title;
    initialTodoMemo = props.location.state.currentTodo.memo;
  }


  const onChangeTitle = e => {
    const title = e.target.value;
    setTitle(title);
  }
  const onChangeMemo = e => {
    const memo = e.target.value;
    setMemo(memo);
  }
  const saveTodo = () => {
    const data = {
      title: title,
      memo: memo,
      completed: false,
    }

    if (editing) {
      TodoDataService.updateTodo(
          props.location.state.currentTodo.id,
          data,
          token
      )
          .then(response => {
            setSubmitted(true);
            console.log(response.data)
          })
          .catch(e =>{
            console.log(e)
          })
    }
    else {
      TodoDataService.createTodo(data, token)
          .then(response => {
            setSubmitted(true);
          })
          .catch(e => {
            console.log(e)
          })
    }
  }

  return (
    <Container>
      {submitted ? (
          <div>
            <h4>Todo submitted successfully</h4>
            <Link to={"/todos/"}>
              Back to Todos
            </Link>
          </div>
      ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{editing ? "Edit": "Create"} Todo</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="e.g. buy gift tomorrow"
                value={title}
                onChange={onChangeTitle}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={memo}
                onChange={onChangeMemo}
              />
            </Form.Group>
            <Button variant="info" onClick={saveTodo}>
              {editing ? "Edit": "Add"} To-do
            </Button>
          </Form>
      )}
    </Container>
  )
}
