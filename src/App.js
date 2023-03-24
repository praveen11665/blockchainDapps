import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
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

  const showDeployer = () => {
    setNavContent(1)
  }
  const showExplorer = () => {
    setNavContent(2)
  }
  const showHideLoader = (value) => {
    setLoading(value)
  } 

  if(loading) {
    return (
      <div className="App">
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
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
              <h1 className="header-h1">Top Blockchain Dapps</h1>
            </Col>
          </Row>
          <Row>
            <Col className='text-align-left'>
              <Button variant="primary" className='app-button'>All</Button>{' '}
              <Button variant="outline-primary" className='app-button'>ETH</Button>{' '}
              <Button variant="outline-primary" className='app-button'>EOS</Button>{' '}
              <Button variant="outline-primary" className='app-button'>TRON</Button>{' '}
              <Button variant="outline-primary" className='app-button'>ONT</Button>{' '}
              <Button variant="outline-primary" className='app-button'>ThunderCore</Button>{' '}
              <Button variant="outline-primary" className='app-button'>VeChain</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Wax</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Steem</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Hive</Button>{''}                    
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
              </Nav>
            </Col>
          </Row>  
        </Container> 

        { navContent === 1 ? <Deployer showHideLoader={showHideLoader} /> : <Explorer /> }       
        
      </ThemeProvider>
    </div>
  )
}

export default App;
