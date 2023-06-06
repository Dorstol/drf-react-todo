import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Alert  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TodoDataService from '../services/todos';
import moment from "moment";


export default function TodosList(props) {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(props.token);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    retriveTodos(token);
  }, []);

  const retriveTodos = (token) => {
    TodoDataService.getAll(token)
      .then(response => {
        console.log(response.data)
        setTodos(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteTodo = (todoId) => {
    TodoDataService.deleteTodo(todoId, token)
        .then(response => {
          retriveTodos(token);
        })
        .catch(e => {
          console.log(e)
        })
  }

  const completeTodo = (todoId) => {
    TodoDataService.completeTodo(todoId, token)
        .then(response => {
          retriveTodos(token);
          console.log("Complete Todo", todoId);
        })
        .catch(e => {
          console.log(e)
        })
  }

  return (
    <Container>
      {token == null || token === "" ? (
        <Alert variant='warning'>
          You are not login in. Please <Link to={"/login"}>login</Link> to see your todos.
        </Alert>
      ):(
        <div>
          <Link to={"/todos/create"}>
            <Button variant={"outline-info"} className="mb-3">
              Add To-do
            </Button>
          </Link>
          {todos.length === 0 ? (
            <Alert variant='info'>No todos found.</Alert>
          ):(
            todos.map((todo) => {
              return (
                <Card key={todo.id} className='mb-3'>
                  <Card.Body>
                    <div className={`${todo.completed ? "text-decoration-line-through" : ""}`}>
                      <Card.Title>{todo.title}</Card.Title>
                      <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
                      <Card.Text>Date created: {moment(todo.created).format("Do MMMM YYYY")}</Card.Text>
                    </div>
                    {!todo.completed &&
                        <Link to={{
                          pathname: "/todos/" + todo.id,
                          state: {
                            currentTodo: todo
                          }
                        }}>
                          <Button variant="outline-info" className="me-2">
                            Edit
                          </Button>
                        </Link>
                    }
                    <Button variant="outline-danger" onClick={() => deleteTodo(todo.id)} className="me-2">
                      Delete
                    </Button>
                    <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>
                      Complete
                    </Button>
                  </Card.Body>
                </Card>
              )
            })
          )}
        </div>
      )}
    </Container>
  )
}
