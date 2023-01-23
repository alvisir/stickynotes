import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import SubmitButton from './SubmitButton';

const SignInForm = props => {
    return (
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert key="signInError" show={props.error !== ''} variant="danger">{props.error}</Alert>
          <Form onSubmit={props.submit}>
            <Form.Group className="mb-3" controlId="signInForm.usernameInput">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="signInForm.passwordInput">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="signInForm.passwordConfirmationInput">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                required
              />
            </Form.Group>
            <SubmitButton label="Submit" submitting={props.submitting} />
          </Form>
        </Modal.Body>
    </Modal>
    )
}

export default SignInForm;
