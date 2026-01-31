import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function PasswordReset() {
  return (
    <div className="d-flex align-items-center min-vh-100 bg-auth border-top border-top-2 border-primary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={5} xl={4} className="my-5">
             <h1 className="display-4 text-center mb-3">Password reset</h1>
      <p className="text-muted text-center mb-5">Enter your email to get a password reset link.</p>
      <form>
        <div className="form-group">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="name@address.com" />
        </div>
        <Button size="lg" className="w-100 mb-3">
          Reset Password
        </Button>
        <p className="text-center">
          <small className="text-muted text-center">
            Remember your password?{' '}
            <Link to="/sign-in">
              <a>Log in</a>
            </Link>
            .
          </small>
        </p>
      </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
