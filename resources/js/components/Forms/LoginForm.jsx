import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import SubmitButton from './SubmitButton';

const LoginForm = props => {
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Alert key="loginError" show={props.error !== ''} variant="danger">{props.error}</Alert>
            <Form onSubmit={props.submit}>
                <Form.Group className="mb-3" controlId="loginForm.usernameInput">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    autoFocus
                    required
                />
                </Form.Group>
                <Form.Group className="mb-4" controlId="loginForm.passwordInput">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    required
                />
                </Form.Group>
                <SubmitButton label="Login" submitting={props.submitting} />
            </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LoginForm;
