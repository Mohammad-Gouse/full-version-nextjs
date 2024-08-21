import React from 'react'
import { DemoProvider } from 'src/context/DemoContext'
// import Home from 'src/views/pages/home/Home'
import Demo from 'src/views/pages/demo/Demo'

const Index = () => {
  return (
    <DemoProvider>
        <Demo />
    </DemoProvider>
  )
}

export default Index