import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Audit from './components/Audit';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Deployer from './components/Deployer';
import Explorer from './components/Explorer';
import Container from 'react-bootstrap/Container';
import ConnectWallet from './components/ConnectWallet';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [loading, setLoading] = useState(false);
  const [navContent, setNavContent] = useState(1); 
  const [solContractCode, setSolContractCode] = useState(''); 

  const showDeployer = () => {
    setNavContent(1)
  }
  const showExplorer = () => {
    setNavContent(2)
  }
  const showAudit = () => {
    setNavContent(3)
  }
  const showHideLoader = (value) => {
    setLoading(value)
  }

  const ContractButtonList = () => {
    let buttonList = [
      {"name": "Bridge", "fileName": 'Bridge.sol'},
      {"name": "ERC20", "fileName": 'ERC20.sol'},
      {"name": "ERC721", "fileName": 'ERC721.sol'},
      {"name": "ERC1155", "fileName": 'ERC1155.sol'},
      {"name": "Game NFTs", "fileName": 'Game_NFTs.sol'},
      {"name": "Metaverse Land_NFTs", "fileName": 'Metaverse_Land_NFTs.sol'},
      {"name": "NFT Auction", "fileName": 'NFT_Auction.sol'},
      {"name": "NFT Borrowing", "fileName": 'NFT_Borrowing.sol'},
      {"name": "NFT Flashloan", "fileName": 'NFT_Flashloan.sol'},
      {"name": "NFT Leanding", "fileName": 'NFT_Leanding.sol'},
      {"name": "NFT Loan", "fileName": 'NFT_Loan.sol'},
      {"name": "NFT Storage", "fileName": 'NFT_Storage.sol'},
      {"name": "NFT Marketplace", "fileName": 'NFTMarketplace.sol'},
      {"name": "Storage", "fileName": 'Storage.sol'},
      {"name": "Token Swap", "fileName": 'Token_Swap.sol'},
    ]

    return (
      buttonList.map((data, index) => {
        return <Button 
          variant="outline-primary" 
          className='app-button mr-1 mt-1' 
          key={index}
          onClick={() => solidityCompiler(data.fileName)}
        >{data.name}
        </Button>
      })
    )
  }

  async function solidityCompiler(fileName) {    
    const module = await import("./contracts/" + fileName);
    fetch(module.default)
    .then(row => row.text())
    .then(text => {
      setSolContractCode(text)
    })
  }

  return (
    <div className="App">
      {
        loading &&
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
      }
      
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#" className="fw-700">
              <FontAwesomeIcon icon={ faBitcoinSign } className="mr-1"/>
              Project Name
            </Navbar.Brand>   
            <ConnectWallet />                     
          </Container>
        </Navbar>

        <Container>
          <Row>
            <Col>
              <h1 className="header-h1">Solidity Contract</h1>
            </Col>
          </Row>
          <Row>
            <Col className='text-align-left'>
              <ContractButtonList />
            </Col>            
          </Row>
          <Row className='mt-5'>
            <Col>
              <Nav fill variant="tabs" defaultActiveKey="#">
                <Nav.Item onClick={showDeployer}>
                  <Nav.Link href="#" className='fw-700'>Deployer</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={showExplorer}>
                  <Nav.Link eventKey="link-1" className='fw-700'>Explorer</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={showAudit}>
                  <Nav.Link eventKey="link-2" className='fw-700'>Audit</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>  
        </Container>

        { navContent === 3  
          ? 
            <Audit showHideLoader={showHideLoader} /> 
          : navContent === 2 
            ? 
              <Explorer showHideLoader={showHideLoader}/> 
            : 
              <Deployer showHideLoader={showHideLoader} solContractCode={solContractCode} setSolContractCode={setSolContractCode}/>
        }        
      </ThemeProvider>
    </div>
  )
}

export default App;
