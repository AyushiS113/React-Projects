import React,{useEffect } from 'react';
import { Link, Outlet,useNavigate} from "react-router-dom";
import { Layout, Button,message} from 'antd';
import '../styles.css';
import axios from 'axios';

const { Header, Sider, Content } = Layout;

const  CommonContent = () => {
    const usenavigate1 = useNavigate();
   
    useEffect(() => {
      authVerify()
    }, []);
    
    const proceedLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        usenavigate1('/');
    
    };
     
    const authVerify = () =>{
    
        axios.interceptors.response.use(
            (response) => {
                return response;
              },
              (error) => {
                if (error.response) {
                  if (error.response.status === 403) {
                    console.log("Unauthorized user");
                  
                  }
                  message.error('Please login again, token is expired');
                  localStorage.removeItem('accessToken');
                  usenavigate1('/');         
                  return error 
                }
                
              }
            );
    }


    return (
        <Layout>
            <Header>
                <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
                <Button type="primary"  style={{ float: "right" }}onClick={proceedLogout} htmlType="submit">
                    Logout
                </Button>
            </Header>
            <Layout>
                <Content>
                   <Outlet/>
                </Content>
                <Sider>
                    <Link style={{ color: "white", float: "right" }} to="/users">Users</Link>
                    <Link style={{ color: "white", float: "right" }} to="/attractions">Attractions</Link>
                </Sider>
            </Layout>
        </Layout >
    );
}

export default CommonContent;