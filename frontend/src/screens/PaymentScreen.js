import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/actions/cartActions';
import FormContainer from '../componects/FormContainer';
import CheckoutSteps from '../componects/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  const [payment, setPayment] = useState(paymentMethod);

  if (Object.keys(shippingAddress).length == 0) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate('/placeorder');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Down Payment</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                value='PayPal'
                name='group1'
                onChange={(e) => setPayment(e.target.value)}
              />
              <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                value='Stripe'
                name='group1'
                onChange={(e) => setPayment(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button type='submit' className='my-4'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
