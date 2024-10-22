import React, { createContext, useContext, useState } from 'react'

// Create a context for the selected segment
const SegmentContext = createContext()

// Create a provider component
const SegmentProvider = ({ children }) => {
  const [selectedSegment, setSelectedSegment] = useState('Equity')

  return <SegmentContext.Provider value={{ selectedSegment, setSelectedSegment }}>{children}</SegmentContext.Provider>
}

export { SegmentContext, SegmentProvider }
