import React, {useState} from 'react'
import ImgUpload from '../../../utils/ImgUpload'
import { Button, Typography , Divider } from 'antd';
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'

const { Title, Paragraph , Text} = Typography;

const RegisterStudentCard = () => {
    const [Image, setImage] = useState([]);
    
    const updateImage = (newImage) => {
        setImage(newImage);
      };
      
    
    return (
        <Fade>
      <div className='contents' >
        <Title>학생증 등록하기</Title>
        <div>
        <Divider/>
        <Paragraph> <Text strong>학생증</Text> 사진을 찍어 등록해주세요. <br/>
        학생증은 영상 등록 시 얼굴 인식 및 출석체크 오차를 줄이기 위해 사용됩니다. <br/>
        사진을 잘못 등록하였을 시, 사진을 클릭하면 사진이 제거됩니다.
        </Paragraph>
        <Divider/>
        </div>
            <div>
            <ImgUpload refreshFunction={updateImage} />
            </div>
            <Button>
                <Link to='/face'>등록하기</Link>
            </Button>
        </div>
        
      </Fade>
    )
}

export default RegisterStudentCard
