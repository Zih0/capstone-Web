import React , {useState ,useEffect} from 'react'
import { Typography , Divider, Row,Col, Modal,Collapse } from 'antd';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade'
import axios from 'axios';


const { Title, Paragraph , Text} = Typography;

const CourseContents = () => {
    const user = useSelector((state) => state.user);
    const [Courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)


    return (
        <Fade>
        <div className='contents'>
            <Title level={5}>수업 확인</Title>
            <Row justify='center'>
                
                {loading && <p>수업 확인</p>}
                <Col>
                    
                </Col>
            </Row>
        </div>
        </Fade>
    )
}

export default CourseContents
