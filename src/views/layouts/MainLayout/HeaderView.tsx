import React, { Dispatch, SetStateAction } from "react";
import { Dropdown, Layout } from "antd";
import Avatar from "../../../../src/assets/images/user.png";
import {
    DownOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/app";
// import { ReactComponent as LeftArrow } from "../../../../assets/images/icon/left-arrow-icon.svg";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../../store/AuthSlice";

interface HeaderViewProps {
    collapsed: boolean;
    SetCollapsed: Dispatch<SetStateAction<boolean>>;
}

const HeaderView: React.FC<HeaderViewProps> = ({ collapsed, SetCollapsed }) => {    
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // call logout function
    const logout = () => {
        dispatch(doLogout()).then(() => {
          navigate("/login");
        });
    };

    const items = [
        { label: <div onClick={() => logout()}>Logout</div>, key: "Logout" },
    ];

    return (
        <Layout.Header className="main__page__appheader">
            <div className="headerWrap">
                <div className="appheader__left">
                    <div className="menuToggle">
                        <div
                            className={`${collapsed ? "icon right" : "icon"}`}
                            onClick={() => SetCollapsed(!collapsed)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        {/* <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => SetCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        /> */}
                    </div>
                </div>
                <div className="appheader__right">
                    <div className="userDropdown">
                        <Dropdown
                            menu={{ items }}
                            trigger={["click"]}
                            overlayClassName="userMenuList"
                        >
                            <div className="userMenuWrap">
                                <span className="avatar">
                                    <img src={Avatar} alt="Avatar"/>
                                </span>
                                <span className="userName">Hello</span>
                                <DownOutlined />
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Layout.Header>
    );
}

export default HeaderView;
