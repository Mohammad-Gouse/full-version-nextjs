import { Container } from '@mui/material'
import React, { useState } from 'react'
import Home from 'src/pages'
import Menu2 from '../menu2/Menu2'
import Menu3 from '../menu3/Menu3'
import Deposit from '../deposit/Deposit'
import PreviewDeposit from '../previewDeposit/PreviewDeposit'
import Menu1 from '../menu1/Menu1'
import Demo from '../demo/Demo'
import { DemoProvider } from 'src/context/DemoContext'


const FillCheque = () => {
  const [dataFromChild, setDataFromChild] = useState({});

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  console.log(dataFromChild)

  return (
    <div style={{display:"flex", flexDirection: "row", height:'50%'}}>
        {/* <Home/> */}

        <div style={{width: '50%'}}>
          <DemoProvider>
          <Demo sendDataToParent={handleDataFromChild}/>
          </DemoProvider>
                 
        </div>
        <div style={{width: '50%', height:'50%', borderRadius:'10px',margin:'10px', boxShadow:'#dbd3d3 0px 0px 10px inset'}}>
            
            <PreviewDeposit payload={dataFromChild}/>
        </div>

    </div>
  )
}

export default FillCheque