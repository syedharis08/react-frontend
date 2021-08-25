import React from 'react'
import { Alert } from 'reactstrap'

const ErrorMessgae = ({ error, visible }) => {
  if (!visible || !error) return null
  return <Alert color='primary'>{error}</Alert>
}

export default ErrorMessgae
