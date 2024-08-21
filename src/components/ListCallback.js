import React, { useEffect, useState } from 'react'

const ListCall = ({getItems})=>{
    const [items, setItems] = useState([])

    useEffect(()=>{
        setItems(getItems())

        console.log("list updated")
    },[getItems])

    // const listData = items.map((item) => <div key={item}>{item}</div>)
    return (<div> {items.map((item) => <div key={item}>{item}</div>)} </div> )
}

export default ListCall