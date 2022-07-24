import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="py-4 text-center">
                        Copy right &copy; Jamil Afouri - ProShop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer