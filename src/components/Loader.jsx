import React from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'

const Loader = () => {
    return (
        <div
            className='d-flex justify-content-center mt-5 align-items-center'
            style={{ height: '100vh' }}>
            <Row>
                <Col>
                    <Spinner
                        className='spinner-border spinner-border-lg'
                        role='Status'
                        style={{ height: '5vh', width: '5vh', color: 'red' }}></Spinner>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ fontSize: '28px', marginLeft: '25px' }}>Catching Pokémon...</div>
                </Col>
            </Row>
        </div>
    )
}

export default Loader
