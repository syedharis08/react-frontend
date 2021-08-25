import React from 'react'
import { Alert } from 'reactstrap'
import Flex from '../shared-components/Flex'

const ErrorMessgae = ({ error, visible }) => {
  if (!visible || !error) return null
  return <Flex style={{color:"red"}}>{error}</Flex>
}

export default ErrorMessgae
