import React, { useState } from 'react';
import { Col, Card, Button, Modal, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ album, page }) => {
    const [open, setOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false)
    const [cls, setCls] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    let wishListIds = []
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    const isvalidArray = (data) => data && Array.isArray(data) && data.length > 0;

    if (isvalidArray(wishList)) {
        wishListIds = wishList.map((d) => d.id);
    }

    const wishListHandler = (album) => {
        if (wishListIds.includes(album.id)) {
            const data = JSON.parse(localStorage.getItem("wishList")) || [];
            setCls('smooth-ele')
            data.filter((d, index) => {
                if (album.id === d.id) {
                    data.splice(index, 1);

                }
            })
            localStorage.setItem("wishList", JSON.stringify(data));
            setTimeout(() => {
                message.error("Removed from wishlist")
                setIsLiked(false)
                if (page === 'wishList') {
                    navigate('/wishList')
                }
                else {
                    navigate('/')
                }
            }, 700)

        }
        else {
            const data = JSON.parse(localStorage.getItem("wishList")) || [];
            setCls('');
            data.push(album);
            localStorage.setItem("wishList", JSON.stringify(data));
            setIsLiked(true)
            message.success("Successfully added")

        }

    }

    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        < Col xs={24} sm={24} md={8} lg={6} xl={6} className={"card-wrapper" + cls}>
            <Modal title={album.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <img alt="example" src={album.image}></img>
                    <p><a href={album.artistLink} target="_blank"><label>Artist: </label>{album.artist}</a></p>
                    <p><a href={album.link} target="_blank"><label>Total Songs: </label>{album.totalItems}</a></p>
                </div>
            </Modal>
            <Card hoverable style={{
                width: 240,
            }} cover={<img alt="example" src={album.image}></img>}>
                <b>{album.title}</b>
                <p>Price: {album.price}</p>
                <p>Release Date: {album.releaseDate}</p>
                <p>Category: {album.category}</p>


                <Button type="primary" onClick={showModal}>
                    More Info
                </Button>

                <span style={{ marginLeft: '10px' }}>{
                    (wishListIds.includes(album.id) || isLiked)
                        ?
                        <HeartFilled style={{ color: "red" }} onClick={() => wishListHandler(album)} />
                        :
                        <HeartOutlined onClick={() => wishListHandler(album)} />}
                </span>
            </Card>
        </Col >
    );
}
export default AlbumItem;   
