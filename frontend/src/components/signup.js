import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Signup(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const signup = () => {
        props.signup({username, password});
        history.push('/');
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </Form.Group>
                <Button variant="primary" onClick={signup}>
                    Signup
                </Button>
            </Form>
        </Container>
    );
}
