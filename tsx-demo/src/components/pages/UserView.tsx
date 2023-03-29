import { Form, Input, Image } from 'antd'
import { observer } from 'mobx-react'
import useStore from '../stores/CommonStore'

const UserView = observer((props:any) => {
    const userStore = useStore()
    var data:any = userStore.UserStore.update_data
    return (
        <div>
            <Form>
                <Form.Item style={{ height: '50px', width: '50px' }}>
                    <Image src={data.avatar} />
                </Form.Item>
                <Form.Item>
                    Firstname :<Input value={data.fname} />
                </Form.Item>
                <Form.Item>
                    LastName :<Input value={data.lname} />
                </Form.Item>
                <Form.Item>
                    Username :<Input value={data.username} />
                </Form.Item>
            </Form>
        </div>
    )
})
export default UserView
