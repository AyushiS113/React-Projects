import React from 'react'
import { Form, Input, Image} from "antd";
import { observer } from 'mobx-react';
import useStore from "../stores/CommonStore";

 const ShowAttract=observer(()=>{
    const attract = useStore();
    const data = attract.Attract.user
    const { TextArea } = Input;
  return (
    <div>
        <Form>
        <Form.Item style={{ height: "70px", width: "70px" }}>
          <Image src={data.coverimage} />
        </Form.Item>
        <Form.Item>
          Name :<Input value={data.name} />
        </Form.Item>
        <Form.Item>
          Detail :<TextArea value={data.detail} />
        </Form.Item>
        <Form.Item>
          Latitude :<Input value={data.latitude} />
        </Form.Item>
        <Form.Item>
          Longitude :<Input value={data.longitude} />
        </Form.Item>
      </Form>
    </div>
  )
})
export default ShowAttract
