import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import Config from "../../../config/Config";
import { useLocation, useNavigate } from "react-router-dom";
import LogoComponent from "../Components/LogoComponent";
import { AppstoreOutlined, DashboardOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/app";
import { camelCaseString } from "../../../config/Global";

interface AppSidebarViewProps {
    collapsed: boolean;
}

const SidebarView: React.FC<AppSidebarViewProps> = ({ collapsed }) => {
    const AUTH = useSelector((state: RootState) => state.AUTH);
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<any>([]);
    const [openMenu, setOpenMenu] = useState<any>([]);

    const svgIcons: any = {
        Dashboard: <DashboardOutlined />,
        UsersManagement: <AppstoreOutlined />,
        Roles: <AppstoreOutlined />,
    }

    const AppMenu = (menu_item: any, open: any = []): any => {
        return menu_item ? Object.keys(menu_item).sort((a, b) => (menu_item[a].sequence_no > menu_item[b].sequence_no) ? 1 : ((menu_item[b].sequence_no > menu_item[a].sequence_no) ? -1 : 0)).map((key) => {
            const item: any = menu_item[key]
            if (item.children) {
                return AppMenu(item.children, open)
            } else {
                if (location.pathname.includes(item.path) && openMenu.length <= 0) {
                    if (open.length === 0) {
                        open.push(item.path)
                    }
                    setOpenMenu(open)
                }

                return { key: item.path, url: item.path, label: item.label, icon: svgIcons[camelCaseString(item.label).replace(" ", "")] }
            }
        }) : null
    }

    useEffect(() => {
        const menuItemsTemp = AppMenu(AUTH.userDetail?.menu);
        setMenu(menuItemsTemp)
    }, [AUTH.userDetail])

    return (
        <Layout.Sider
            collapsed={collapsed}
            width={Config.sidebar_width}
            className="main__page__appsidebar "
        >
            <LogoComponent collapsed={collapsed} />
            <Menu
                mode="inline"
                theme="dark"
                activeKey={location.pathname}
                items={menu}
                onClick={(item) => navigate(item.key)}
            />
        </Layout.Sider>
    );
}

export default SidebarView;
