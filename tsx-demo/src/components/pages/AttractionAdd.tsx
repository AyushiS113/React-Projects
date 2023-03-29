import React, { useState } from 'react'
import { Input, Button, Form } from 'antd'
import { observer } from 'mobx-react'
import useStore from '../stores/CommonStore'
import { AttractionInterface } from '../pages/AttractionInterface'

const AttractionAdd = observer((props: any) => {
    type AttractValues = {
        [key: string]: any
    }
    const attract = useStore()
    const [btndisabled, setBtnDisabled] = useState(false)
    const update: AttractValues = attract.Attract.Update_Attract
    var initialValues = {}
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    }

    if (props.init === true) {
        initialValues = {
            name: update.name,
            detail: update.detail,
            latitude: update.latitude,
            longitude: update.longitude,
        }
    } else {
        initialValues = ''
    }
    const onValuesChange = (
        changedValues: string,
        allValues: {
            name: string
            detail: string
            latitude: number
            longitude: number
        }
    ) => {
        if (
            allValues.name !== undefined &&
            allValues.detail !== undefined &&
            allValues.latitude !== undefined &&
            allValues.longitude !== undefined
        ) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }
    const [form] = Form.useForm()
    const cancel = () => {
        form.resetFields()
        props.pass()
    }
    const handleOk = (values: AttractionInterface) => {
        const fval = {
            ...values,
            coverimage: 'https://www.melivecode.com/attractions/1.jpg',
        }
        attract.Attract.addAttraction(fval)
        form.resetFields()
        props.pass()
    }
    const handleUpdate = (values: AttractionInterface) => {
        const update_val = { ...values, id: update.id }
        attract.Attract.UpdateAttraction(update_val)
        form.resetFields()
        props.pass()
    }

    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                onValuesChange={onValuesChange}
                onFinish={props.init === true ? handleUpdate : handleOk}
                initialValues={initialValues}
            >
                <Form.Item
                    name={['name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Name is required!',
                        },
                        {
                            pattern: /^[a-zA-Z]+$/,
                            message: 'Name can only includes letters',
                        },
                        {
                            whitespace: true,
                            message: 'Name can not be blank',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter Name" />
                </Form.Item>
                <Form.Item
                    name={['detail']}
                    label="Detail"
                    rules={[
                        {
                            required: true,
                            message: 'Detail is required!',
                        },
                        {
                            whitespace: true,
                            message: 'Detail can not be blank',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter Detail" />
                </Form.Item>
                <Form.Item
                    name={['latitude']}
                    label="latitude"
                    rules={[
                        {
                            required: true,
                            message: 'Latitude is required!',
                        },
                        {
                            pattern: /^[0-9]+.[0-9]/,
                            message: 'Enter only digits',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter latitude" />
                </Form.Item>
                <Form.Item
                    name={['longitude']}
                    label="longitude"
                    rules={[
                        {
                            required: true,
                            message: 'Longitude is required!',
                        },
                        {
                            pattern: /^[0-9]+.[0-9]/,
                            message: 'Enter only digits',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter Longitude" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={btndisabled}
                    >
                        {props.init === true ? 'Update' : 'Ok'}
                    </Button>
                    &nbsp;&nbsp;
                    <Button onClick={cancel}>Cancel</Button>
                </Form.Item>
            </Form>
        </div>
    )
})
export default AttractionAdd
