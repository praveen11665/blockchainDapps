import './App.css';
import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

function App() {
  return (
    <div className="App">
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#" className="fw-700">
              <img src={logo} className="App-logo image-size" alt="logo"/>
              DappRadar
            </Navbar.Brand>            
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
              <Button variant="outline-primary" className='app-button'>Hive</Button>{' '}
              <Button variant="outline-primary" className='app-button'>BNB Chain</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Polygon</Button>{' '}   
              <Button variant="outline-primary" className='app-button'>ETH</Button>{' '}
              <Button variant="outline-primary" className='app-button'>EOS</Button>{' '}
              <Button variant="outline-primary" className='app-button'>TRON</Button>{' '}
              <Button variant="outline-primary" className='app-button'>ONT</Button>{' '}          
            </Col>            
          </Row>
          <Row>
            <Col className='text-align-left mt-2'>              
              <Button variant="outline-primary" className='app-button'>ThunderCore</Button>{' '}
              <Button variant="outline-primary" className='app-button'>VeChain</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Wax</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Steem</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Hive</Button>{' '}
              <Button variant="outline-primary" className='app-button'>BNB Chain</Button>{' '}
              <Button variant="outline-primary" className='app-button'>Polygon</Button>{' '}             
            </Col>            
          </Row>

          <Table className='mt-5 app-table'>
            <thead>
              <tr>
                <th>#</th>
                <th className='text-left'>Name</th>
                <th>Category</th>
                <th className='text-right'>Balance</th>
                <th className='text-right'>UAW</th>
                <th className='text-right'>Volume</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className='text-left'>
                  <div className='fw-700'>StormGain</div> 
                  <div className='text-muted'>ETH</div>
                </td>
                <td>Exchanges</td>
                <td className='text-right'>$103.15K</td>
                <td className='text-right'>
                  <div>5</div>
                  <div className='fw-700 text-success'>
                    +150.00%
                  </div>
                </td>
                <td className='text-right'>$229.88</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td className='text-left'>
                  <div className='fw-700'>Alien Words</div> 
                  <div className='text-muted'>WAX</div>
                </td>
                <td>Exchanges</td>
                <td className='text-right'>$103.15K</td>
                <td className='text-right'>
                  <div>3</div>
                  <div className='fw-700 text-danger'>
                    -50.00%
                  </div>
                </td>
                <td className='text-right'>$229.88</td>
                <td></td>
              </tr>  
              <tr>
                <td>3</td>
                <td className='text-left'>
                  <div className='fw-700'>PancakeSwap</div> 
                  <div className='text-muted'>BNB Chain</div>
                </td>
                <td>DeFi</td>
                <td className='text-right'>$352.51M</td>
                <td className='text-right'>
                  <div>139.79K</div>
                  <div className='fw-700 text-success'>
                    +4.10%
                  </div>
                </td>
                <td className='text-right'>$176.31M</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td className='text-left'>
                  <div className='fw-700'>Hooked</div> 
                  <div className='text-muted'>WAX</div>
                </td>
                <td>Exchanges</td>
                <td className='text-right'>$103.15K</td>
                <td className='text-right'>
                  <div>3</div>
                  <div className='fw-700 text-danger'>
                    -50.00%
                  </div>
                </td>
                <td className='text-right'>$229.88</td>
                <td></td>
              </tr>
              <tr>
                <td>1</td>
                <td className='text-left'>
                  <div className='fw-700'>StormGain</div> 
                  <div className='text-muted'>ETH</div>
                </td>
                <td>Exchanges</td>
                <td className='text-right'>$103.15K</td>
                <td className='text-right'>
                  <div>5</div>
                  <div className='fw-700 text-success'>
                    +150.00%
                  </div>
                </td>
                <td className='text-right'>$229.88</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td className='text-left'>
                  <div className='fw-700'>Alien Words</div> 
                  <div className='text-muted'>WAX</div>
                </td>
                <td>Exchanges</td>
                <td className='text-right'>$103.15K</td>
                <td className='text-right'>
                  <div>3</div>
                  <div className='fw-700 text-danger'>
                    -50.00%
                  </div>
                </td>
                <td className='text-right'>$229.88</td>
                <td></td>
              </tr>           
            </tbody>
          </Table>     
        </Container>   
        
      </ThemeProvider>
    </div>
  );
}

export default App;
