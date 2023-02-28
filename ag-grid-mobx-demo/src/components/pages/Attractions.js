import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaTrash, FaPen, FaEye, FaRandom } from "react-icons/fa";
import { Button, Select, Modal, Drawer, Space } from "antd";
import AttractionAdd from "./AttractionAdd";
import ShowAttract from "./ShowAttract";
import { observer } from "mobx-react";
import useStore from "../stores/CommonStore";
import "ag-grid-enterprise";
import "ag-grid-community";
import ServerGridConfig from "./ServerGridConfig";
import { PlusOutlined } from "@ant-design/icons";
import Attract from "../Attract.json";

const Attractions = observer(() => {
  const attract = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [initialValues, setInitialValues] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userdelete, setUserdelete] = useState();

  const customComparator = (valueA, valueB) => {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  };

  const show_User = (id) => {
    localStorage.setItem("user", JSON.stringify(id));
    attract.Attract.showUser(id);
    showDrawer();
  };
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };
  const deleteUser = (id) => {
    setIsDeleteModalOpen(true);
    setUserdelete(id);
  };
  const confirm = (id) => {
    attract.Attract.DeleteUser(id);
    console.log(id);
    setIsDeleteModalOpen(false);
  };
  const cancel_user = (e) => {
    console.log(e);
    setIsDeleteModalOpen(false);
  };
  const update = (data) => {
    setInitialValues(true);
    const ele = (
      <h2>
        <center>Update Attractions/Places</center>
      </h2>
    );
    setTag(ele);
    setIsUpdateModal(true);
    attract.Attract.setUpdateAttact(data);
  };
  const user = attract.Attract.total_data;
  const data = {
    columnDef: [
      {
        headerName: "CoverImage",
        resizable: "true",
        width: 110,
        maxWidth: 120,
        cellRendererFramework: (params) => {
          const img = params.data.coverimage;
          return (
            <img
              src={img}
              alt=" "
              style={{ height: "30px", width: "30px", borderRadius: "3px" }}
            />
          );
        },
      },
      {
        headerName: "Id",                                   
        field: "id",
        sortable: true,
        resizable: "true",
        width: 70,
        maxWidth: 80,
      },
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: "agTextColumnFilter",
        resizable: "true",
        filterParams: {
          buttons: ["reset", "apply"],
          debounceMs: 1000,
          suppressAndOrCondition: true,
        },
        comparator: customComparator,
      },
      {
        headerName: "Latitude",
        field: "latitude",
        sortable: true,
        resizable: "true",
      },
      {
        headerName: "Longitude",
        field: "longitude",
        sortable: true,
        resizable: "true",
      },
      {
        headerName: "Action",
        field: "action",
        cellRendererFramework: (params) => (
          <div>
            <Button style={{ color: "red" }}>
              <FaTrash onClick={() => deleteUser(params.data.id)} />
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button>
              <FaPen onClick={() => update(params.data)} />
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={() => show_User(params.data.id)}>
              <FaEye />
            </Button>
          </div>
        ),
      },
    ],
  };
  const cancel = () => {
    setIsModalOpen(false);
  };
  const adduser = () => {
    const ele = (
      <h2>
        <center>Create New Attractions/Places</center>
      </h2>
    );
    setInitialValues(false);
    setTag(ele);
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsDrawerOpen(false);
  };
  const handleChange = (val) => {
    attract.Attract.setPageSize(val);
  };
  const CancelUpdate = () => {
    setIsUpdateModal(false);
  };
  const add_random = () => {
    const len = Attract.length;
    const random = Math.floor(Math.random() * len);
    console.log(random);
    const res = Attract[random];
    const finalData = {
      ...res,
    };
    attract.Attract.addAttraction(finalData);
  };

  return (
    <div>
      <div>
        <h2 style={{ marginTop: "20px" }}>Atractions/Places</h2>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: "700px" }}
          onClick={adduser}
        >
          <PlusOutlined />
          Create
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" htmlType="submit" onClick={add_random}>
          <FaRandom />
          Add Random Attraction
        </Button>
        <Modal open={isModalOpen} footer={null} onCancel={cancel} title={tag}>
          <AttractionAdd pass={cancel} />
        </Modal>
        <Modal
          open={isUpdateModal}
          footer={null}
          onCancel={CancelUpdate}
          title={tag}
        >
          <AttractionAdd pass={CancelUpdate} init={initialValues} />
        </Modal>
        <Modal
          open={isDeleteModalOpen}
          onOk={() => confirm(userdelete)}
          onCancel={cancel_user}
          okText="Yes"
          cancelText="No"
          title="Are you sure to delete this attraction/places ??"
        ></Modal>
        &nbsp;&nbsp;
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
              value: user,
              label: "All",
            },
          ]}
        />{" "}
        entries &nbsp;&nbsp;
      </div>
      <Drawer
        title="Attraction/Places Information"
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
        <ShowAttract />
      </Drawer>
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
                rowModelType={ServerGridConfig.options.rowModelType}
                onGridReady={attract.Attract.onGridReady}
                gridOptions={ServerGridConfig.options}
                rowSelection={"multiple"}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Attractions;
