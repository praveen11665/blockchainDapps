import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Form} from 'react-bootstrap';

export default function Explorer(props) {
    const {showHideLoader} = props;

    useEffect(() => {
        console.log(JSON.parse(window.localStorage.getItem('addressData')))    
    }, [])

    const [solidityCode, setSolidityCode] = useState('');
    const [solidityAbi, setSolidityAbi] = useState([]);
    const [solidityBytecode, setSolidityBytecode] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    function onSearch() { 
        if(!walletAddress) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter your address.',
                showConfirmButton: false,
                timer: 1500
            })

            return false
        }

        let  addressData = JSON.parse(window.localStorage.getItem('addressData'))

        let findData = addressData.find((v) => {
            return v.address === walletAddress
        })

        if(!findData) {
            Swal.fire({
                icon: 'error',
                title: 'Given address not found.',
                showConfirmButton: false,
                timer: 1500
            })

            return false
        }

        showHideLoader(true)
        retrieveContract(findData.cid)
    }

    async function retrieveContract(cid) {
        let url = "https://"+ cid +".ipfs.w3s.link/"
        
        fetch(url)
        .then((response) => response.json())
        .then((data) => setStateValues(data))
    }

    const setStateValues = (data) => {
        setSolidityCode(data.code)
        setSolidityAbi(JSON.stringify(data.abi))
        setSolidityBytecode(data.bytecode)
        showHideLoader(false)
    }

    return(
        <div>
            <div className="bar mt-3">
                <input 
                    className="searchbar" 
                    type="text" 
                    placeholder='Please enter your address.' 
                    onChange={(e) => setWalletAddress(e.target.value)}
                    value={walletAddress}
                />

                <FontAwesomeIcon icon={ faSearch } className='text-white pointer' onClick={() => onSearch()}/>
            </div>

            {solidityCode &&
            <Container className='mt-3'>
                <Row>
                    <Col md={{ span: 12, offset: 12 }}>
                        <Form.Control
                            as="textarea"
                            className='bg-dark-blue text-white text-area-height'
                            value={solidityCode}
                            disabled
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="text-muted fw-700 text-left">ABI: </h5>
                        <h5 className="text-white fw-bold text-break text-left">{solidityAbi}</h5>   
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="text-muted fw-700 text-left">ByteCode: </h5>
                        <h5 className="text-white fw-bold text-break text-left">{solidityBytecode}</h5>   
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="text-success fw-700 text-left">
                            Your contract has been deployed to address {walletAddress}
                        </h3>
                    </Col>
                </Row>
            </Container>}
        </div>
    )
}