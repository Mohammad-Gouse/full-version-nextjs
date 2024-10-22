import { useContext } from 'react'
import { SegmentContext } from 'src/context/SegmentContext'

export const useSegment = () => useContext(SegmentContext)
