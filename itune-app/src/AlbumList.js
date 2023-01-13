import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Divider, Space, Input, Select, DatePicker, Menu } from 'antd';
import AlbumItem from './AlbumItem';
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

const AlbumList = () => {

    const [searchAll, setSearchAll] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [dateSearch, setDateSearch] = useState("");
    const [currentMenu, setCurrentMenu] = useState('albums');

    const navigate = useNavigate();

    useEffect(() => {
        axios.
            get('https://itunes.apple.com/us/rss/topalbums/limit=100/json').
            then(response => {
                localStorage.setItem("albumList", JSON.stringify(response.data.feed.entry));
            }).
            catch(error => {
                console.log(error);
            });
    }, []);

    const isvalidArray = (data) => data && Array.isArray(data) && data.length > 0;

    const albumList = JSON.parse(localStorage.getItem("albumList"));
    let cat = [];
    if (isvalidArray(albumList)) {
        const category = albumList.map((data) => {
            return data.category.attributes["label"];
        });
        cat = [...new Set(category)];
    }

    const onMenuClick = (e) => {
        setCurrentMenu(e.key);
        if (e.key === 'albums') {
            navigate('/')
        }
        else {
            navigate('/wishlist')
        }

    };

    const getFilteredData = () => {

        if (isvalidArray(albumList)) {


            return albumList.filter((d) => {
                return (
                    d.title.label.toLowerCase().includes(searchAll) ||
                    d.category.attributes.term.toLowerCase().includes(searchAll) ||
                    d["im:price"].label.toLowerCase().includes(searchAll)
                );
            })

                .slice(0, 100)
                .filter((d) => {
                    if (categorySearch) {
                        return d.category.attributes.label.toLowerCase() === categorySearch.toLowerCase()
                    }
                    return true;
                })
                .filter((d) => {
                    if (dateSearch) {
                        return d["im:releaseDate"]["attributes"].label.includes(dateSearch);
                    }
                    return true;
                });
        }

    };

    const filtered = getFilteredData();
    const getFiltered = () => {
        if (isvalidArray(filtered)) {
            return filtered;
        } else {
            return [];
        }
    };

    const onChange = (date, dateString) => {
        const d = new Date(dateString);
        if (dateString != '') {
            const finalDate = d.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })
            setDateSearch(finalDate);
        }
        else {
            setDateSearch('');
        }
    };

    const listData = getFiltered();
    return (
        <>
            <div className="container-fluid">
                <Menu onClick={onMenuClick} style={{ marginBottom: "20px" }} selectedKeys={[currentMenu]} mode="horizontal" items={items} />
                <Space direction="horizontal">
                    <Row gutter={[8, 8]} justify="space-between">
                        < Col xs={24} sm={24} md={8} lg={6} xl={6} >
                            <Input
                                placeholder="Enter search value"
                                value={searchAll}
                                onChange={(e) => setSearchAll(e.target.value)}
                                style={{
                                    width: 200,
                                }}
                            />
                        </Col>
                        < Col xs={24} sm={24} md={8} lg={6} xl={6} >
                            {
                                isvalidArray(cat) ?
                                    <Select
                                        placeholder="Select a category"
                                        onChange={(e) => setCategorySearch(e)}
                                        allowClear={true}
                                        value={categorySearch}
                                        style={{ width: "200px" }}
                                    >
                                        {cat.map((option, index) => (
                                            <Select.Option key={option} value={option}>
                                                {option}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    : ""
                            }
                        </Col>
                        < Col xs={24} sm={24} md={8} lg={6} xl={6} >
                            <DatePicker defaultValue={dateSearch} onChange={onChange} />
                        </Col>
                    </Row>
                </Space>
                <Divider />
                <Row gutter={[8, 8]} justify="space-around">
                    {
                        isvalidArray(listData) ? (

                            listData.map((album) => {
                                const album_details = {
                                    id: album['id']['attributes']['im:id'],
                                    title: album['title']['label'] ? album['title']['label'] : '',
                                    price: album['im:price']['label'] ? album['im:price']['label'] : '',
                                    image: album['im:image'][2]['label'] ? album['im:image'][2]['label'] : '',
                                    category: album['category']['attributes']['label'] ? album['category']['attributes']['label'] : '',
                                    totalItems: album['im:itemCount']['label'] ? album['im:itemCount']['label'] : '',
                                    link: album['link']['attributes']['href'] ? album['link']['attributes']['href'] : '',
                                    artist: album['im:artist']['label'] ? album['im:artist']['label'] : '',
                                    artistLink: album['im:artist']['attributes']?.['href'] ? album['im:artist']['attributes']['href'] : '',
                                    releaseDate: album['im:releaseDate']['attributes']['label'] ? album['im:releaseDate']['attributes']['label'] : ''
                                }
                                return <AlbumItem key={album_details.id} album={album_details} page="album" />
                            })
                        ) : <p>No items found</p>
                    }
                </Row>
            </div>
        </>
    )

}


export default AlbumList;