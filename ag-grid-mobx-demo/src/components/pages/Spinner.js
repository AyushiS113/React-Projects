import React from "react";
import {Spin} from 'antd'

export default function Spinner() {
    return (
      <div>
          <div style={{marginLeft:"600px",fontSize:"500px"}}>
          <Spin tip="Loading..." size="large" />
          </div>
      </div>
    )
  }
  