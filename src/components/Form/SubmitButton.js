import React from 'react'
import { useFormikContext } from 'formik'
import { Button } from 'reactstrap'

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext()
  return <Button onClick={handleSubmit}>{title}</Button>
}

export default SubmitButton
