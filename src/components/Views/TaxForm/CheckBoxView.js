import React from 'react'
import { Col, Input, Label, Row } from 'reactstrap'
import Flex from '../../shared-components/Flex'
const CheckBoxView = ({
  data,
  checkedItems,
  setCheckedItems,
  parentChecked,
  setParentChecked,
  appliedTo,
  search,
}) => {
  const renderItems = (items) => {
    let filteredData = items.filter((tempData) => {
      if (tempData.name.toLowerCase().includes(search.toLowerCase())) {
        return tempData
      }
    })

    return filteredData.map((singleItem, index) => {
      return (
        <Flex key={index} className='m-xl-3'>
          <Row>
            <Col md={12}>
              <Label check>
                <Input
                  disabled={appliedTo === 'all'}
                  type='checkbox'
                  checked={checkedItems.includes(singleItem.id)}
                  onChange={(e) => {
                    if (checkedItems.includes(singleItem.id)) {
                      let tempItem = checkedItems.filter(
                        (item) => item !== singleItem.id
                      )
                      setCheckedItems(tempItem)
                    } else {
                      setCheckedItems([...checkedItems, singleItem.id])
                    }
                  }}
                />{' '}
                {''}
                {singleItem.name}
              </Label>
            </Col>
          </Row>
        </Flex>
      )
    })
  }
  return (
    <Row>
      <Col md={12}>
        <Label check>
          <Input
            type='checkbox'
            disabled={appliedTo === 'all'}
            checked={parentChecked.includes(data.id)}
            onChange={(e) => {
              if (parentChecked.includes(data.id)) {
                let tempParentChecked = parentChecked.filter(
                  (item) => item !== data.id
                )
                setParentChecked(tempParentChecked)
                let tempData = data.items.map((singleItem) => {
                  return singleItem.id
                })
                setCheckedItems(
                  checkedItems.filter((item) => !tempData.includes(item))
                )
              } else {
                setParentChecked([...parentChecked, data.id])
                data.items.forEach((singleItem) => {
                  setCheckedItems((prevState) => {
                    let newState = prevState
                    newState = [...newState, singleItem.id]
                    return [...newState]
                  })
                })
              }
            }}
          />{' '}
          {''}
          {data.name}
        </Label>
        {renderItems(data.items)}
      </Col>
    </Row>
  )
}

export default CheckBoxView
