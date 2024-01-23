import React from 'react'
import {useParams} from 'react-router-dom'

const Param = () => {

  const {para} = useParams()

  return (
    <div>this is \{para}\ param</div>
  )
}

export default Param