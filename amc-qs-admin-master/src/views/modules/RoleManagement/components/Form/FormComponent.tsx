import React, { useEffect, useState } from "react";
import { Card, Checkbox, Col, Divider, Row } from "antd";
import { FormBox, InputBox } from "../../../../../components/AntdAddons";
import { rules } from "./rules";
import { fetchPrivilegesList } from "../../../../../store/CommonSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/app";

const FormComponent: React.FC<any> = ({
  form,
  id,
  handleSubmit,
  onValuesChange,
  editValues,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [privilegesList, setPrivilegesList] = useState<any[]>([]);

  const onChangeContent = (checked: boolean, id: number, parentId: number, type: string) => {
    const newPrivilegesList: any[] = privilegesList.map((item: any) => {
      let isSelected = item.selected;
      const child = item.child.map((childItem: any) => {
        let childSelected = childItem.selected;
        if (parentId && id == childItem.id) {
          childSelected = checked;
        }
        if (type == "parentId" && childItem.parent_id == id) {
          childSelected = checked;
        }
        if (isSelected === false && childSelected) {
          isSelected = childSelected;
        }

        return { ...childItem, selected: childSelected };
      });

      if (item.id === id) {
        isSelected = checked;
      }

      return { ...item, selected: isSelected, child: child };
    });
    setPrivilegesList(newPrivilegesList);
  };

  useEffect(() => {
    dispatch(fetchPrivilegesList()).then((data: any) => {
      const oldPrivileges = (editValues?.privileges && editValues?.privileges.split("#")) ?? [];
      const privileges = data.data.map((item: any) => {
        let childIsSelected = false;
        let selected = false;
        const child = item.child.map((childItem: any) => {
          let childSelected = false;
          if (!childIsSelected) {
            childIsSelected = oldPrivileges.includes(childItem.id.toString());
          }
          childSelected = oldPrivileges.includes(childItem.id.toString());

          return { ...childItem, selected: childSelected };
        });

        if (childIsSelected || (item.child.length == 0 && oldPrivileges.includes(item.id.toString()))) {
          selected = true;
        } else {
          selected = false;
        }

        return { ...item, selected: selected, child: child };
      });

      setPrivilegesList(privileges);
    });
  }, []);

  useEffect(() => {
    if (editValues) {
      form.setFieldsValue(editValues);
    }
  }, [editValues, form]);

  useEffect(() => {
    //
  }, [privilegesList]);


  const onFinish = (data: any) => {
    const selectedPrivileges: any = [];
    privilegesList.map((privilege: any) => {
      privilege.selected && selectedPrivileges.push(privilege.id);
      privilege.child.map((childPrivilege: any) => {
        childPrivilege.selected &&
          selectedPrivileges.push(childPrivilege.id);
      });
    });
    data.privileges = (selectedPrivileges.length > 0) ? "#" + selectedPrivileges.join("#") + "#" : null;
    handleSubmit(data);
  };

  return (
    <>
      <FormBox
        form={form}
        id={id}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={15}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              name="name"
              label="Name"
              rules={rules.name()}
            />
          </Col>
          <Col xs={{ span: 24 }}>
            <Row gutter={15}>
              <Col xs={{ span: 4 }}>Features</Col>
              <Col xs={{ span: 20 }}>Actions</Col>
            </Row>
            {privilegesList && privilegesList.map((item: any) => {
              return (
                <Row gutter={15} key={item.id}>
                  <Card className="mt-10" style={{ width: "100%" }}>
                    <Row gutter={15} key={item.id}>
                      <Col xs={{ span: 4 }} style={{ borderRight: '1px solid #f0f0f0' }}><b>{item.name}</b></Col>
                      <Col xs={{ span: 20 }}>
                        <div style={{ display: "inline" }}>
                          <Checkbox
                            checked={item.selected}
                            value={item.id}
                            onChange={(e) =>
                              onChangeContent(e.target.checked, item.id, 0, "parentId")
                            }
                          >List</Checkbox>
                        </div>

                        <Divider type='vertical' />
                        {item?.child.map((subPrivilege: any, index: number) => {
                          return (
                            <>
                              <div key={index} style={{ display: "inline" }}>
                                <Checkbox
                                  checked={subPrivilege.selected}
                                  onChange={(e) =>
                                    onChangeContent(e.target.checked, subPrivilege.id, subPrivilege.parent_id, "childId")
                                  }
                                >{subPrivilege.name}</Checkbox>
                              </div>
                              <Divider type='vertical' />
                            </>
                          )
                        })}

                      </Col>
                    </Row>
                  </Card>
                </Row>
              )
            })}
          </Col>
        </Row>
      </FormBox>
    </>
  );
};

export default FormComponent;
