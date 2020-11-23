import React , {useState ,useEffect} from 'react'
import { Typography , Divider,Tabs, Table } from 'antd';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade'
import axios from 'axios';


const { Title} = Typography;

const { TabPane } = Tabs;

const CheckContetns = () => {
    const user = useSelector((state) => state.user);
    const [Courses, setCourses] = useState([])
    const getCheck = () =>{
        let body = {
            userId: user.userData.studentId
        }
        axios.post("/api/datas/check",body).then((response) => {
        if (response.data.success) {
          setCourses(response.data.checkList[0].course);
          console.log(Courses)
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
          dataIndex:'1w',
        },
        {
          title: '2주차',
          key: '2w',
          dataIndex:'2w',
        },
        {
          title: '3주차',
          key: '3w',
          dataIndex:'3w',
        },
        {
          title: '4주차',
          key: '4w',
          dataIndex:'4w',
        },
        {
          title: '5주차',
          key: '5w',
          dataIndex:'5w',
        },
        {
            title: '6주차',
            key: '6w',
            dataIndex:'6w',
            },{
            title: '7주차',
            key: '7w',
            dataIndex:'7w',
            },{
            title: '8주차',
            key: '8w',
            dataIndex:'8w',
            },{
            title: '9주차',
            key: '9w',
            dataIndex:'9w',
            },{
            title: '10주차',
            key: '10w',
            dataIndex:'10w',
            },{
            title: '11주차',
            key: '11w',
            dataIndex:'11w',
            },{
            title: '12주차',
            key: '12w',
            dataIndex:'12w',
            },{
            title: '13주차',
            key: '13w',
            dataIndex:'13w',
            },{
            title: '14주차',
            key: '14w',
            dataIndex:'14w',
            },{
            title: '15주차',
            key: '15w',
            dataIndex:'15w',
              fixed:'right'
          },
      ];
      
    
    return (
        <Fade>
        <div className='contents' style={{width:'100%', overflowX:'scroll'}}>
            <Title >마이페이지</Title>
            <Title level={5}>출석체크 확인</Title>
            <Divider/>
            
                <Tabs defaultActiveKey="1" style={{overflowX:'scroll'}}>
                {Courses.map(pane => (
          <TabPane tab={pane.coursename} key={pane.key}>
              <Table  bordered columns={columns} scroll={{ x: 'max-content' }}  size="small" dataSource={[{
          key: '1',
          '1w': pane.check['1'],
          '2w': pane.check['2'],
          '3w': pane.check['3'],
          '4w': pane.check['4'],
          '5w': pane.check['5'],
          '6w': pane.check['6'],
          '7w': pane.check['7'],
          '8w': pane.check['8'],
          '9w': pane.check['9'],
          '10w': pane.check['10'],
          '11w': pane.check['11'],
          '12w': pane.check['12'],
          '13w': pane.check['13'],
          '14w': pane.check['14'],
          '15w': pane.check['15']
     }]}></Table>
          </TabPane>
        ))}
                </Tabs>
                
        </div>
        </Fade>
    )
}

export default CheckContetns