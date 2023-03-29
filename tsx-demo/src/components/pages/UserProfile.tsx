import React,{useEffect, useState} from 'react'
import { Card } from 'antd'
import { observer } from 'mobx-react'
import useStore from '../stores/CommonStore'
const UserProfile = observer((props: any) => {
  const [user,setUser]=useState<any>({})
    const loginStore = useStore()
    const { Meta } = Card;
    useEffect(()=>{
      loginStore.LoginStore.authUser().then(() => {
       setUser(loginStore.LoginStore.auth_user)
      })
    },[])

    return (
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
        </div>
    )
})
export default UserProfile
