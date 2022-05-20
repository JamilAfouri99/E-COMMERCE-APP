import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../componects/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Message from '../componects/Message';
import Loading from '../componects/Loading';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Paginate from '../componects/Paginate';
import ProductCarousel from '../componects/ProductCarousel';
import Meta from '../componects/Meta';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, navigate, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <br />
          <br />
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
