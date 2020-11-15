import React, {useState, useEffect} from 'react'
import { Button, Typography , Divider, Row,Col, Modal,Layout, Menu } from 'antd';
import { BookOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'

import './Mypage.css'
import VideoContents from './Section/VideoContents';
import CheckContetns from './Section/CheckContents';
import CourseContents from './Section/CourseContents';

const { Content, Sider } = Layout;
const { Title, Paragraph , Text} = Typography;

const MyPage = () => {
    const [visiblevideo, setVisiblevideo] = useState(true)
    const [visiblecheck, setVisiblecheck] = useState(false)
    const [visiblecourse, setVisiblecourse] = useState(false)

    const videoHandler = ()=>{
        setVisiblecourse(false)
        setVisiblecheck(false)
        setVisiblevideo(true)
    }
    const checkHandler = ()=>{
        setVisiblecourse(false)
        setVisiblevideo(false)
        setVisiblecheck(true)
    }
    const courseHandler = ()=>{
        setVisiblevideo(false)
        setVisiblecheck(false)
        setVisiblecourse(true)

    }
    return (
    <Fade>
        <Layout>
        <Sider className="site-layout-background" 
        breakpoint="xs"
        collapsedWidth="0" 
        onBreakpoint={ broken => {
        console.log(broken);
      }}
        onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}> 
      <div className='logo'>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0}}
        >
            <Menu.Item key="1"  icon={<VideoCameraOutlined />}><a onClick={videoHandler}>등록영상 확인</a></Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}><a onClick={checkHandler}>출석체크 확인</a></Menu.Item>
            <Menu.Item key="3" icon={<BookOutlined />}><a onClick={courseHandler}>등록수업 확인</a></Menu.Item>
        </Menu>
        </div>
      </Sider>
        <Content>
        {visiblevideo && <VideoContents/>}
        {visiblecheck && <CheckContetns/>}
        {visiblecourse && <CourseContents/>}
        

        </Content>
        </Layout>
    </Fade>
    )
}

export default MyPage
