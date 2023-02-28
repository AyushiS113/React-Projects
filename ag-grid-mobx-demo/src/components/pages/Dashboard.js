import { Card, Statistic } from "antd";
import { observer } from "mobx-react";
import React from "react";
import useStore from "../stores/CommonStore";
import { ArrowUpOutlined, UserOutlined } from "@ant-design/icons";
const Dashboard=observer((props)=> {
  const login=useStore()
  const { Meta } = Card;
  login.LoginStore.AuthUser()
  const user=login.LoginStore.auth_user
  const totalUser=login.userStore.user_data
  return (
    <div>
      <div className="card" style={{ height: "400px" }}>
        <Card
          hoverable
          style={{ width: 240, marginTop: "30px", marginLeft: "50px" }}
          cover={<img alt="Avatar" src={user.avatar} />}
        >
          <Meta
            title={user.fname + "\t\t" + user.lname}
            description={user.username}
          />
        </Card>
        <Card style={{ width: 240, marginTop: "30px", marginLeft: "50px" }} cover={<UserOutlined style={{fontSize:"40px"}}/>}>
        <Statistic
          title="Active Users"
          value={totalUser.length}
          precision={1}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
      </div>
    </div>
  );
})
export default Dashboard
