import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Deployer(props) {
    const {showHideLoader} = props;

    const [question, setQuestion] = useState('');
    const [code, setCode] = useState();
    const [abi, setAbi] = useState();
    const [bytecode, setBytecode] = useState();

    function onSearch() {
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
                    setAbi(response.compile_data.contracts[value].SimpleStorage.abi)
                    setBytecode(response.compile_data.contracts[value].SimpleStorage.evm.bytecode.object)
                } else {
                    setAbi(response.compile_data.contracts[value].Storage.abi)
                    setBytecode(response.compile_data.contracts[value].Storage.evm.bytecode.object)
                }

                setCode(response.code)
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

    return (
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
    )
} 