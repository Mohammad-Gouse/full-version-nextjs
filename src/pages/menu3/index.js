import { Button } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import ListCall from "src/components/ListCallback";

const index = ()=>{
  const [count, setCount] = useState(0)
  const [dark, setDark] = useState(false)

  function getItems(){
    return [count, count+1, count+3]
  }


  const theme = {
    backgroundColor: dark? 'black': 'white',
    color:dark?'white':'black'
  }

  return (
  <>
    <h1>count: {count}</h1>
    <Button onClick={()=>setCount(count+1)}>Add</Button>
    <Button onClick={()=>setCount(count-1)}>Sub</Button>
    <button onClick={()=>setDark(!dark)}>Theme</button>
    <ListCall getItems={getItems} />

  </>
  )
}

export default index;