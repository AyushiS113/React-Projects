import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { Button, Drawer, Modal, Select, Space } from "antd";
import AddUser from "./AddUser";
import UserView from "./UserView";
import { observer } from "mobx-react";
import useStore from "../stores/CommonStore";
import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import {FaRandom} from 'react-icons/fa'
import Data from '../Data.json'
const UserTable = observer((props) => {
  const usersStore = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(false);
  const [userdelete, setUserdelete] = useState();
  const [tag, setTag] = useState("");
  const users = usersStore.userStore.user_data;
  const perPage = usersStore.userStore.users_page;

  const update = (data) => {
    
    setInitialValues(true);
    const ele = (
      <h1>
        <center>Update User</center>
      </h1>
    );
    setTag(ele);
    setIsUpdateModal(true);
    usersStore.userStore.setupdate(data);
  };
  const show_User = (id) => {
    localStorage.setItem("user", JSON.stringify(id));
    usersStore.userStore.showUser(id);
    showDrawer();
    console.log(id);
  };
  const delete_user = (id) => {
    console.log(id);
    setIsDeleteModalOpen(true);
    setUserdelete(id);
  };
  const confirm = (id) => {
    usersStore.userStore.deleteUser(id);
    console.log(id);
    setIsDeleteModalOpen(false);
  };
  const cancel_user = (e) => {
    console.log(e);
    setIsDeleteModalOpen(false);
  };
  const customComparator = (valueA, valueB) => {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  };
  const data = {
    columnDef: [
      {
        headerName: "Avatar",
        resizable: "true",
        width: 90,
        cellRendererFramework: (params) => {
          const img = params.data.avatar;
          return (
            <img src={img} alt=" " style={{ width: "30px", height: "30px" }} />
          );
        },
      },
      {
        headerName: "Id",
        field: "id",
        sortable: true,
        filter: "agNumberColumnFilter",
        resizable: "true",
        width: 90,
      },
      {
        headerName: "FirstName",
        field: "fname",
        sortable: true,
        filter: "agTextColumnFilter",
        resizable: "true",
        comparator: customComparator,
      },
      {
        headerName: "LastName",
        field: "lname",
        sortable: true,
        filter: "agTextColumnFilter",
        comparator: customComparator,
      },
      {
        headerName: "Username",
        field: "username",
        sortable: true,
        filter: "agTextColumnFilter",
        resizable: "true",
        comparator: customComparator,
      },
      {
        headerName: "Action",
        field: "action",
        cellRendererFramework: (params) => (
          <div>
            <Button
              style={{ color: "red" }}
              onClick={() => delete_user(params.data.id)}
            >
              <FaTrash />
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={() =>{
                 update(params.data)
            }
           }>
              <FaPen />
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={() => show_User(params.data.id)}>
              <FaEye />
            </Button>
          </div>
        ),
      },
    ],
    rowData: users.length > 0 ? users : "No Records Found",
  };
  const adduser = () => {
    const ele = (
      <h1>
        <center>Create New User</center>
      </h1>
    );
    setInitialValues(false);
    setTag(ele);
    setIsModalOpen(true);
  };
  const cancel = () => {
    setIsModalOpen(false);
  };
  const CancelUpdate = () => {
    setIsUpdateModal(false);
  };
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };
  const onClose = () => {
    setIsDrawerOpen(false);
  };
  const handleChange = (val) => {
    console.log(val);
    usersStore.userStore.pagination(val);
  };
  const rowClassRules = useMemo(() => {
    return {
      latitude: (params) => {
        var id = params.data.id;
        return id >= 5 && id <= 6;
      },
      lati: "data.id >= 8 && data.id<=10",
    };
  }, []);
  const add_random = () => {
    const len = Data.length;
    const random = Math.floor(Math.random() * len);
    console.log(random);
    const res = Data[random];
    const finalData = {
      ...res,
    };
    usersStore.userStore.addUser(finalData)
  };

  return (
    <div>
      <div>
        <h2 style={{ marginTop: "20px" }}>Users</h2>
        <Button
          type="primary"
          htmlType="submit"
          onClick={adduser}
          style={{ marginLeft: "700px" }}
        >
        <PlusOutlined/>
          Create
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" htmlType="submit" onClick={add_random}>
          <FaRandom/>
          Add Random User
        </Button>
        <br />
        Show{" "}
        <Select
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: 5,
              label: 5,
            },
            {
              value: 10,
              label: 10,
            },
            {
              value: 20,
              label: 20,
            },
            {
              value: users.length,
              label: "All",
            },
          ]}
        />{" "}
        entries&nbsp;&nbsp;
        <br />
        <Drawer
          title="User Information"
          open={isDrawerOpen}
          onClose={onClose}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={onClose}>
                OK
              </Button>
            </Space>
          }
        >
          <UserView />
        </Drawer>
        <Modal open={isModalOpen} footer={null} onCancel={cancel} title={tag}>
          <AddUser pass={cancel} />
        </Modal>
        <Modal
          open={isUpdateModal}
          footer={null}
          onCancel={CancelUpdate}
          title={tag}
        >
          <AddUser pass={CancelUpdate} init={initialValues} />
        </Modal>
        <Modal
          open={isDeleteModalOpen}
          onOk={() => confirm(userdelete)}
          onCancel={cancel_user}
          okText="Yes"
          cancelText="No"
          title="Are you sure to delete this user ??"
        ></Modal>
      </div>
      <div>
        <div className="col-md-5">
          <div className="card" style={{ height: "600px", width: "1100px" }}>
            <br />
            <div
              className="ag-theme-alpine"
              style={{ height: "550px", width: "1000px", marginLeft: "50px" }}
            >
              <AgGridReact
                columnDefs={data.columnDef}
                rowData={data.rowData}
                pagination="true"
                paginationPageSize={perPage}
                floatingFilter="true"
                rowClassRules={rowClassRules}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default UserTable;
