import React from 'react'
import { Input, Button, Form } from 'antd'
import { useState } from 'react'
import { observer } from 'mobx-react'
import useStore from '../stores/CommonStore'

const AddUser = observer((props: any) => {
    const usersStore = useStore()
    const [btndisabled, setBtnDisabled] = useState(false)
    const update: any = usersStore.UserStore.setUpdate_data
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
            fname: update.fname,
            lname: update.lname,
            username: update.username,
            email: update.username,
        }
    } else {
        initialValues = ''
    }

    const validateMessages = {}
    const [form] = Form.useForm()

    const handleOk = (values: object) => {
        usersStore.UserStore.addUser(values)
        form.resetFields()
        props.pass()
    }

    const handleUpdate = (values: object) => {
        const update_val = { ...values, id: update.id, avatar: update.avatar }
        usersStore.UserStore.update_user(update_val)
        form.resetFields()
        props.pass()
    }

    const onValuesChange = (
        changedValues: any,
        allValues: {
            fname: string
            lname: string
            username: string
            email: string
        }
    ) => {
        if (
            allValues.fname !== undefined &&
            allValues.lname !== undefined &&
            allValues.username !== undefined &&
            allValues.email !== undefined
        ) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }

    const cancel = () => {
        props.pass()
        form.resetFields()
    }
    return (
        <div>
            <Form
                {...formItemLayout}
                onFinish={props.init === true ? handleUpdate : handleOk}
                validateMessages={validateMessages}
                form={form}
                onValuesChange={onValuesChange}
                initialValues={initialValues}
            >
                <Form.Item
                    name={['fname']}
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Firstname is required!',
                        },
                        {
                            pattern: /^[a-zA-Z]+$/,
                            message: 'Firstname can only includes letters',
                        },
                        {
                            whitespace: true,
                            message: 'FirstName can not be blank',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter Firstname" />
                </Form.Item>
                <Form.Item
                    name={['lname']}
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Lastname is required!',
                        },
                        {
                            pattern: /^[a-zA-Z]+$/,
                            message: 'lastname can only include letters',
                        },
                        {
                            whitespace: true,
                            message: 'lastname can not be blank',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter Lastname" />
                </Form.Item>
                <Form.Item
                    name={['username']}
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Username is required!',
                        },
                        {
                            whitespace: true,
                            message: 'Username can not be blank',
                        },
                        {
                            pattern: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                            message: 'Username is not a valid !',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter username" />
                </Form.Item>
                <Form.Item
                    name={['email']}
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'email is required!',
                            type: 'email',
                        },
                        {
                            whitespace: true,
                            message: 'Email can not be blank',
                        },
                        {
                            pattern: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                            message: 'Email is not a valid !',
                        },
                    ]}
                >
                    <Input placeholder="Please Enter Email" />
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
export default AddUser
