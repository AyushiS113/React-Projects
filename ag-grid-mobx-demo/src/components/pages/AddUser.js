import React, { useEffect } from 'react'
import { Input, Button, Form } from 'antd'
import { useState } from 'react'
import { observer } from 'mobx-react'
import useStore from '../stores/CommonStore'
const AddUser = observer((props) => {
    const usersStore = useStore()
    const [btndisabled, setBtnDisabled] = useState(false)

    const update = usersStore.userStore.setupdate_data
    useEffect(() => form.resetFields(), [update]);

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
    var initialValues = {
        fname: update.fname,
        lname: update.lname,
        username: update.username,
        email: update.username,
    }
    const validateMessages = {}
    const [form] = Form.useForm()

    const handleOk = (values) => {
        console.log(values)
        usersStore.userStore.addUser(values)
        form.resetFields()
        props.pass()
    }
    const handleUpdate = (values) => {
        const update_val = { ...values, id: update.id, avatar: update.avatar }
        usersStore.userStore.update_user(update_val)
        form.resetFields()
        props.pass()
    }

    const onValuesChange = (changedValues, allValues) => {
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

        console.log(allValues)
        console.log(changedValues)
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
                initialValues={props.init === true ? initialValues : ''}
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
