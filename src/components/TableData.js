import Table from 'react-bootstrap/Table';

export default function TableData() {
    return(
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
    )
}