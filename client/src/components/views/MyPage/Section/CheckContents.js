import React , {useState ,useEffect} from 'react'
import { Typography , Divider, Row,Col,Tabs, Table } from 'antd';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade'
import axios from 'axios';


const { Title, Paragraph , Text} = Typography;

const { TabPane } = Tabs;

const CheckContetns = () => {
    const user = useSelector((state) => state.user);
    const [Courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    const getCheck = () =>{
        setLoading(true)
        let body = {
            userId: user.userData.studentId
        }
        axios.post("/api/datas/check",body).then((response) => {
        if (response.data.success) {
          setCourses(response.data.checkList[0].course);
          console.log(Courses)
          setLoading(false)
        } else {
          alert("수업 정보를 가져오는데 실패했습니다.");
        }
      });
    }
    useEffect(() => {
        getCheck()
    }, [])

    const columns = [
        {
          title: '1주차',
          key: '1w',
        },
        {
          title: '2주차',
          key: '2w',
        },
        {
          title: '3주차',
          key: '3w',
        },
        {
          title: '4주차',
          key: '4w',
        },
        {
          title: '5주차',
          key: '5w',
        },
        {
            title: '6주차',
            key: '6w',
          },{
            title: '7주차',
            key: '7w',
          },{
            title: '8주차',
            key: '8w',
          },{
            title: '9주차',
            key: '9w',
          },{
            title: '10주차',
            key: '10w',
          },{
            title: '11주차',
            key: '11w',
          },{
            title: '12주차',
            key: '12w',
          },{
            title: '13주차',
            key: '13w',
          },{
            title: '14주차',
            key: '14w',
          },{
            title: '15주차',
            key: '15w',
          },
      ];
      
    
    return (
        <Fade>
        <div className='contents'>
            <Title >마이페이지</Title>
            <Title level={5}>출석체크 확인</Title>
            <Divider/>
            <Row justify='center'>
                <p>출첵확인</p>
                <Col span={24}>
                <Tabs defaultActiveKey="1">

                {Courses.map(pane => (
          <TabPane tab={pane.coursename} key={pane.key}>
              <Table bordered columns={columns}  dataSource={[{
       key: '1',
       '1주차': pane.check[0],
       '2주차': pane.check[1],
          '3주차': pane.check[2],
          '4주차': pane.check[3],
          '5주차': pane.check[4],
          '6주차': pane.check[5],
          '7주차': pane.check[6],
          '8주차': pane.check[7],
          '9주차': pane.check[8],
          '10주차': pane.check[9],
          '11주차': pane.check[10],
          '12주차': pane.check[11],
          '13주차': pane.check[12],
          '14주차': pane.check[13],
          '15주차': pane.check[14]
     }]}></Table>
          </TabPane>
        ))}
                </Tabs>
                </Col>
            </Row>
        </div>
        </Fade>
    )
}

export default CheckContetns

 {/* {loading && <Collapse defaultActiveKey={['1']}>
                    {Courses.map((course)=>{
                        <Panel header={course.coursename} key={course.key}>
                        <Table columns={columns}  dataSource={{
       key: '1',
       '1주차': course.check[0],
       '2주차': course.check[1],
          '3주차': course.check[2],
          '4주차': course.check[3],
          '5주차': course.check[4],
          '6주차': course.check[5],
          '7주차': course.check[6],
          '8주차': course.check[7],
          '9주차': course.check[8],
          '10주차': course.check[9],
          '11주차': course.check[10],
          '12주차': course.check[11],
          '13주차': course.check[12],
          '14주차': course.check[13]
       
     }}></Table>
                        <p>Hello</p>
                        
                    </Panel> 
                    })}
                    
                </Collapse>} */}