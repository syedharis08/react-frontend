import React from 'react'
import { useFormikContext } from 'formik'
import { Input, Label } from 'reactstrap'

import ErrorMessgae from './ErrorMessage'

const CustomRadioButtons = ({
  name,
  value,
  setCheckAll,
  checked,
  title,
  onChangeText = () => {},
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()

  return (
    <>
      <Label check>
        <Input
          onChange={(event) => {
            handleChange(name)(value ? value : event.target.value)
            onChangeText(event)
            setCheckAll(value)
          }}
          value='all'
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
