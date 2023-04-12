import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';

export default function Explorer(props) {
    const {showHideLoader} = props;    
    const [message, setSolidityMessage] = useState('');
    const [auditReport, setAuditReport] = useState('');

    const clearSolidityMessage = () => {
        setSolidityMessage('')
    }
    const clearAuditReport = () => {
        setAuditReport('')
    }

    function auditSearch() {
        if(!message) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter a valid Solidity code.',
                showConfirmButton: false,
                timer: 1500
            })

            return false
        }

        showHideLoader(true)
        fetch('https://api.0x0.ai/message', {
            method: 'POST',
            headers: {
                accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
 
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setAuditReport(data.message)
            showHideLoader(false)
        }) 
    }    

    return(
        <div>
            <div className="bar mt-3">
                <input 
                    className="searchbar" 
                    type="text" 
                    placeholder='Enter your Solidity code here...' 
                    onChange={(e) => setSolidityMessage(e.target.value)}
                    style={{ height: '8rem' }}
                    value={message}
                />
            </div>
            <Button 
                variant="outline-primary" 
                className='app-button mr-1 mt-3' 
                onClick={auditSearch} 
                >Audit
            </Button>
            <Button 
                variant="outline-primary" 
                className='app-button mr-1 mt-3'
                onClick={clearSolidityMessage} 
                >Clear
            </Button>

            {auditReport &&
            <Container className='mt-3'>
                <Row>
                    <Col md={{ span: 12, offset: 12 }}>
                        <Form.Control
                            as="textarea"
                            className='bg-dark-blue text-white text-area-height'
                            value={auditReport}
                            disabled
                        />
                    </Col>
                </Row> 
                <Row>
                    <Col>
                        <Button 
                            variant="outline-primary" 
                            className='app-button mr-1 mt-3 mb-3' 
                            onClick={clearAuditReport} 
                            >Clear Report
                        </Button>
                    </Col>
                </Row>               
            </Container>}
        </div>
    )
}