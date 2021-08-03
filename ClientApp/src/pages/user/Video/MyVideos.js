import React, { useEffect, useState } from 'react'
import { Table, Space, Button } from 'antd';
import Loading from '../../../components/UI/Loading';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { authHeader } from '../../../services/Authheader';
import { openNotification } from '../../../components/UI/Notification';
import { Popconfirm, message } from 'antd';





export const MyVideos = () => {

    const [videos, setVideos] = useState({ data: [], isLoaded: false })
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Date Uploaded',
            dataIndex: 'uploadedOn',
            sorter: {
                //C# date to JS
                compare: (a, b) => new Date(Date.parse(a.uploadedOn)) - new Date(Date.parse(b.uploadedOn)),
                multiple: 3,
            },
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            sorter: {
                compare: (a, b) => a.tags.length - b.tags.length,
                multiple: 2,
            },
        },
        {
            title: 'Video',
            dataIndex: 'videoName',
            sorter: {
                compare: (a, b) => a.videoName.length - b.videoName.length,
                multiple: 1,
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this video?"
                        onConfirm={()=> deleteVideo(record.id)}
                        
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button type="primary" danger>
                        Delete 
                    </Button>
                    </Popconfirm>
                    {/* <Button type="primary">
                        Edit
                    </Button> */}
                </Space>
            ),
        },
    ];
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const fetchVideos = () => {
        var url = 'api/video/myvideos'
        fetch(url, { method: 'GET' ,  headers : authHeader() }).then(res => res.json())
            .then(resData => setVideos({ data: resData, isLoaded: true }))
            .catch(e => alert(e));
    }

    const deleteVideo = id =>{
        var url = 'api/video/'+id
        fetch(url, {
            method: 'DELETE',
            headers : authHeader()
          }).then(async response => {
           
            const data =  await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data) || response.status;
                return Promise.reject(error);
            }

            console.log('success');
            const newVideos = videos.data.filter(item => item.id !== id);

            setVideos({isLoaded:true, data: newVideos})
            openNotification({type:'success',message:"Video Successfully Deleted",description:""})   
        })
        .catch(error => {
           
            openNotification({type:'error',message:error,description:""})   
        }).finally(x=> {console.log('finally')});
    }

    useEffect(() => {
        fetchVideos()

    }, [])

    let content = <Loading name='Loading' />;
    if (videos.isLoaded && videos.data.length !== 0) {
        content = <Table columns={columns} dataSource={videos.data.map(obj => ({ ...obj, key: obj.videoName }))} onChange={onChange} />
    }
    if (videos.isLoaded && videos.data.length === 0) {
        content = 'You do not have any videos!'
    }


    return (
        <div>
            <br></br>
            <h3>Your Videos { videos.isLoaded && `{${videos.data.length}}` }   <Button  type="primary" icon={ <Link to='/upload-your-video'> <UploadOutlined  /></Link> } size='large' /></h3>
            {content}'

        </div>
    )
}
