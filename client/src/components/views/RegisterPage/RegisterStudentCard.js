import React, {useState} from 'react'
import ImgUpload from '../../../utils/ImgUpload'
import { Button, Typography , Divider, Row,Col, Image, Spin } from 'antd';
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'

const { Title, Paragraph , Text} = Typography;

const RegisterStudentCard = () => {
    const [image, setImage] = useState('');
    const [Abled, setAbled] = useState(true)
    const [Loading, setLoading] = useState(false)
    const [studentid, setStudentid] = useState('')
    const updateloading = () =>{
      setLoading(true)
    }
    const updateImage = (datas) => {
        setImage(datas.data.filePath);
        setStudentid(datas.data.studentid)
        setLoading(false)
        setAbled(false)
      };
    
    
    return (
        <Fade>
        <Spin spinning={Loading} delay={500} size="large" tip="e-id 인식중">
      <div className='contents' >
        <Title>회원 가입</Title>
        <Title level={2}>E-ID 등록하기</Title>
        <Divider/>
        <Row justify="center" align='middle'>
        <Col xs={{span: 24, offset:12}} lg={{span: 11, offset:1}}>
          <Image width={240} src="https://user-images.githubusercontent.com/60956392/99140597-93ad1880-2686-11eb-9742-54fe4f595463.png" />
        </Col>
        <Col xs={{span: 24, offset:12}} lg={{span: 11, offset:1}} >
        <br/>
        <Paragraph> <Text strong>e-id</Text> 화면을 캡쳐해서 등록해주세요. <br/>
        e-id의 학번으로 회원가입이 진행되고,<br/> 
        e-id의 얼굴 사진은 출석체크 악용을 막기 위해 사용됩니다. <br/>
        </Paragraph>
        <Divider/>
          <div>
          <ImgUpload refreshFunction={updateImage} loadingFunction={updateloading}/>
          </div>
    {!Abled &&<Text strong>E-ID 인식이 <Text type="danger">완료</Text>되었습니다.<br/>회원가입을 진행해주세요.<br/></Text>}
          {!Abled && <p>학번 : {studentid}</p>}
            <Button disabled={Abled} type='primary'>
                <Link to={{
                  pathname:`/register`,
                  state:{
                    studentid: studentid,
                    filePath: image
                  }}}>회원가입</Link>
            </Button>
            </Col>
        </Row>
      </div>
      </Spin>
      </Fade>
    )
}

export default RegisterStudentCard
