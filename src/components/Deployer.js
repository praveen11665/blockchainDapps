import Web3 from 'web3'
import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Web3Storage } from "web3.storage";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';

export default function Deployer(props) {
    const {showHideLoader} = props;
    const [question, setQuestion] = useState('');
    const [solidityCode, setSolidityCode] = useState('');
    const [solidityAbi, setSolidityAbi] = useState('');
    const [solidityBytecode, setSolidityBytecode] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const onSearch = () => { 
        if(!question) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter your solidity contract.',
                showConfirmButton: false,
                timer: 1500
            })

            return false
        }

        showHideLoader(true)

        axios.get(`https://abi-test.onrender.com/compile?code=`+question).then((result) => {
            let response = result.data

            if(response.code) {
                let value = 'SimpleStorage.sol'

                if(response.compile_data.contracts[value].SimpleStorage) {
                    setSolidityAbi(response.compile_data.contracts[value].SimpleStorage.abi)
                    setSolidityBytecode(response.compile_data.contracts[value].SimpleStorage.evm.bytecode.object)
                } else {
                    setSolidityAbi(response.compile_data.contracts[value].Storage.abi)
                    setSolidityBytecode(response.compile_data.contracts[value].Storage.evm.bytecode.object)
                }


                setSolidityCode(response.code)  
                showHideLoader(false)
            }
        }).catch(() => {
            showHideLoader(false)

            Swal.fire({
                icon: 'error',
                title: 'Something Went wrong. Please try again.',
                showConfirmButton: false,
                timer: 1500
            })

            return false
        })
    } 

    async function codeDeploy() {
        window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        let accounts = await window.web3.eth.getAccounts();

        if(!accounts.length) {
            Swal.fire({
                icon: 'error',
                title: 'Please connect your wallet.',
                showConfirmButton: false,
                timer: 1500
            })

            return false
        }

        showHideLoader(true)

        var deployingContract = new window.web3.eth.Contract(solidityAbi).deploy({
            data: solidityBytecode,
            arguments: []
        })

        await deployingContract.estimateGas();
        var deployedContract = await deployingContract.send({
            from: accounts[0]
        })
        
        setWalletAddress(deployedContract.options.address)
        storeContract({
            question: question,
            code: solidityCode,
            abi: solidityAbi,
            bytecode: solidityBytecode,
            walletAddress: deployedContract.options.address,
        })
        showHideLoader(false)
    }

    async function storeContract(obj) {
        console.log('obj', obj)

        let web3AccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRFN0VENEIxYjYyMUY1RTU5QThlNEQxODk3RDE5NjdGRThGOUFlNmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY3MDY4MjAxMzYsIm5hbWUiOiJtYW5pIn0.kxOPF3kxqW4B7JTkAGbhtduw2TER7iJWwTQ8TLYmB7E'

        const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });       
        const files = [new File([blob], "contract.json")];
        const client = new Web3Storage({ token: web3AccessToken })        
        const cid = await client.put(files, {
            wrapWithDirectory: false,
        });

        let data = [];
        data = JSON.parse(localStorage.getItem('addressData')) || [];
        data.push({            
            address: obj.walletAddress,
            cid: cid,
        })

        localStorage.setItem('addressData', JSON.stringify(data));

        return cid;
    }

    return (
        <div>
            <div className="bar mt-3">
                <input 
                    className="searchbar" 
                    type="text" 
                    placeholder='Please enter your solidity contract.' 
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                />

                <FontAwesomeIcon icon={ faSearch } className='text-white pointer' onClick={() => onSearch()}/>
            </div>

            {solidityCode &&
            <Container className='mt-3'>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Control
                            as="textarea"
                            className='bg-dark-blue text-white'
                            style={{ height: '550px' }}
                            value={solidityCode}
                            disabled
                        />
                        {   walletAddress 
                            ?
                                <h5 className="text-success fw-700 text-center mt-2">
                                    Your contract has been deployed to address {walletAddress}
                                </h5>
                            :
                                
                                <>
                                    <h5 className="text-success fw-700 text-center mt-2">
                                        Your contract executed successfully.Deploy your contract here...
                                    </h5>
                                    <Button variant="primary" className='mt-2' onClick={() => codeDeploy()}>
                                        Deploy
                                    </Button>
                                </>
                        }
                    </Col>
                </Row>
            </Container>}

        </div>
    )
} 