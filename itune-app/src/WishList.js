import React, { useState } from 'react';
import AlbumItem from './AlbumItem';
import { Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
    {
        label: 'Albums',
        key: 'albums',
    },
    {
        label: 'Wishlist',
        key: 'wishlist',
    },

];
const WishList = () => {
    const [currentMenu, setCurrentMenu] = useState('wishlist');
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("wishList"))
    const isvalidArray = (data) => data && Array.isArray(data) && data.length > 0;

    const onMenuClick = (e) => {
        setCurrentMenu(e.key);
        if (e.key === 'albums') {
            navigate('/')
        }
        else {
            navigate('/wishlist')
        }

    };

    return (
        <div className="container-fluid">
            <Menu onClick={onMenuClick} style={{ marginBottom: "20px" }} selectedKeys={[currentMenu]} mode="horizontal" items={items} />
            <Row gutter={[8, 8]} justify="space-around">
                {
                    isvalidArray(data) ?
                        data.map((album) => {
                            return <AlbumItem key={album.id} album={album} page="wishList" />
                        })
                        : <p>No items found</p>
                }
            </Row>
        </div>

    );
}
export default WishList;   
