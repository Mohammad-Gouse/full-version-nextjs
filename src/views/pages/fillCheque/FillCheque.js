import { Container } from '@mui/material'
import React from 'react'
import Home from 'src/pages'
import Menu2 from '../menu2/Menu2'
import Menu3 from '../menu3/Menu3'
import Deposit from '../deposit/Deposit'
import PreviewDeposit from '../previewDeposit/PreviewDeposit'

const FillCheque = () => {
  return (
    <div style={{display:"flex", flexDirection: "row", height:'50%'}}>
        {/* <Home/> */}

        <div style={{width: '50%'}}>
                 <Deposit/>
        </div>
        <div style={{width: '50%', height:'50%', boxShadow:'inset 0 0 10px black'}}>
            
            <PreviewDeposit/>
        </div>

    </div>
  )
}

export default FillCheque