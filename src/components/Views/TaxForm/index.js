import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Input, InputGroup } from 'reactstrap'

import * as Yup from 'yup'

import ApiCall from '../../../service/network'
import urlConstant from '../../../service/urls'
import CheckBoxView from './CheckBoxView'
import { AppFormField, AppForm, RadioButtons, SubmitButton } from '../../Form'
import { toast, ToastContainer } from 'react-toastify'
import Flex from '../../shared-components/Flex'

export default function TaxForm() {
  const [itemData, setItemData] = useState([])
  const [checkedItems, setCheckedItems] = useState([])
  const [parentChecked, setParentChecked] = useState([])
  const [search, setSearch] = useState('')
  const [taxInWords, setTaxInWords] = useState('')

  const [checkAll, setCheckAll] = useState('')

  const initialValues = {
    taxInNumber: '',
    appliedTo: '',
  }

  const validationSchema = Yup.object({
    taxInNumber: Yup.number().required('Required').max(100),
    appliedTo: Yup.string().required('One of these checkbox should be checked'),
  })

  useEffect(() => {
    getItems()
  }, [])

  const checkAllItem = (item) => {
    item.map((tempItem) => {
      if (!checkedItems.includes(tempItem.id)) {
        setCheckedItems((prevState) => {
          let newState = prevState
          newState = [...newState, tempItem.id]
          return [...newState]
        })
      }
    })
  }

  const checkAllCategory = () => {
    itemData.map((singleItem) => {
      if (!parentChecked.includes(singleItem.id)) {
        setParentChecked((prevState) => {
          let newState = prevState
          newState = [...newState, singleItem.id]
          return [...newState]
        })
      }
      checkAllItem(singleItem.items)
    })
  }

  const handleSubmit = async (value) => {
    let obj = {
      applicableItems: checkedItems,
      appliedTo: value.appliedTo,
      name: taxInWords,
      rate: parseInt(value.taxInNumber) / 100,
    }

    if (checkedItems.length === 0) {
      toast.error('Select items to add tax')
      return
    }
    const response = await ApiCall.post(urlConstant.SET_TAX, obj)
    if (response.ok) {
      return toast.success('Items updated successfully')
    } else {
      return toast.error(response.data.message[0])
    }
  }

  const getItems = async () => {
    let withParentCategory = []
    let withoutParent = { name: '', id: -1, items: [] }
    const response = await ApiCall.get(urlConstant.GET_ITEMS)
    if (!response.ok) {
      return toast.error(response?.data?.message[0])
    }

    response?.data?.map((item) => {
      if (!item.parent_id) {
        withoutParent = {
          ...withoutParent,
          items: [...withoutParent.items, { id: item.id, name: item.name }],
        }
      } else {
        if (withParentCategory.length === 0) {
          withParentCategory = [
            ...withParentCategory,
            {
              name: item.category.name,
              id: item.category.id,
              items: [{ id: item.id, name: item.name }],
            },
          ]
        } else {
          withParentCategory.map((category) => {
            if (category.id === item.category.id) {
              category.items = [
                ...category.items,
                { id: item.id, name: item.name },
              ]
            } else {
              withParentCategory = [
                ...withParentCategory,
                {
                  name: item.category.name,
                  id: item.category.id,
                  items: [{ id: item.id, name: item.name }],
                },
              ]
            }
          })
        }
      }
    })

    setItemData(withParentCategory.concat(withoutParent))
  }

  return (
    <AppForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Container className='mt-5'>
        <h3>Add Tax</h3>
        <Row>
          <Col md={6}>
            <AppFormField
              disabled
              value={taxInWords}
              placeholder='Tax in words'
            />
          </Col>
          <Col md={3}>
            <InputGroup>
              <AppFormField
                name='taxInNumber'
                tempName='taxInWords'
                placeholder='Enter Tax in number'
                setTaxInWords={setTaxInWords}
                type='number'
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col className='d-flex flex-column' md={12}>
            <RadioButtons
              name='appliedTo'
              type='radio'
              value='all'
              onChangeText={checkAllCategory}
              setCheckAll={setCheckAll}
              checked={checkAll === 'all'}
              title={'Apply to all items in collection'}
            />{' '}
            {''}
            <RadioButtons
              name='appliedTo'
              type='radio'
              value='some'
              setCheckAll={setCheckAll}
              checked={checkAll === 'some'}
              title={'Apply to specific items'}
            />{' '}
            {''}
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        <Row>
          <Col md={6}>
            <Input
              placeholder='Search'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Col>
        </Row>
        {itemData.map((singleItem, index) => {
          return (
            <Flex key={index} className='mt-1'>
              <CheckBoxView
                data={singleItem}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                parentChecked={parentChecked}
                setParentChecked={setParentChecked}
                appliedTo={checkAll}
                search={search}
              />
            </Flex>
          )
        })}
      </Container>
      <hr />
      <Container>
        <Flex className='d-flex justify-content-end'>
          <SubmitButton
            title={`Apply Tax to ${checkedItems?.length} item(s)`}
          />
        </Flex>
      </Container>
      <ToastContainer autoClose={2000} />
    </AppForm>
  )
}
