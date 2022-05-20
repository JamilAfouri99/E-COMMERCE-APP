import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../componects/Message';
import Loading from '../componects/Loading';
import { login } from '../redux/actions/userActions';
import FormContainer from '../componects/FormContainer';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/';

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    console.log('userInfo', userInfo);
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loading />}
      {!loading && (
        <>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId={email}>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='my-2' controlId={email}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              type='submit'
              vaiant='primary'
              className='my-2'
              style={{ width: 'auto' }}>
              {' '}
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              {/* // to={redirect ? `/register?redirect=${redirect}` : '/register'}> */}
              <Link to={`/register`}>Register</Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default LoginScreen;
