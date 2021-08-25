import React from 'react'
import { useFormikContext } from 'formik'
import { Input, Label } from 'reactstrap'

import ErrorMessgae from './ErrorMessage'

const CustomRadioButtons = ({
  name,
  customValue,
  setCheckAll,
  checked,
  title,
  onChangeText = () => {},
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext()

  return (
    <>
      <Label check>
        <Input
          onChange={(event) => {
            handleChange(name)(customValue ? customValue : event.target.value)
            onChangeText(event)
            setCheckAll(customValue)
          }}
          customValue='all'
          checked={checked}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
        {title}
      </Label>

      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default CustomRadioButtons
