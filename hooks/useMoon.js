import { useContext } from 'react'
import { MoonContext } from '../context/MoonContext'

const useMoon = () => {
  const moonContext = useContext(MoonContext)

  if (moonContext === undefined) {
    throw new Error('L3P context undefined')
  }

  return moonContext
}

export default useMoon
