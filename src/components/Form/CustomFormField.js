import React from 'react'
import { useFormikContext } from 'formik'
import { Input } from 'reactstrap'
import { ToWords } from 'to-words'

import ErrorMessgae from './ErrorMessage'
import Flex from '../shared-components/Flex'

const AppFormField = ({
  name,
  customValue,
  tempName,
  type = 'text',
  setTaxInWords,
  onChangeText = () => {},
  ...otherProps
}) => {
  const toWords = new ToWords()

  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()

  return (
    <>
      <Flex flexDirection={"column"}>
        <Input
          onChange={(event) => {
            handleChange(name)(customValue ? customValue : event.target.value)
            if (event.target.value !== '') {
              setTaxInWords(toWords.convert(event.target.value))
            } else {
              setTaxInWords('')
            }
            onChangeText(event)
          }}
          type={type}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
        <ErrorMessgae error={errors[name]} visible={touched[name]} />
      </Flex>
    </>
  )
}

export default AppFormField
