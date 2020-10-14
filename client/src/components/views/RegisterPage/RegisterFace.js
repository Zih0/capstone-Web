import React, { useState, useRef, useCallback } from 'react';
import { Button, Result, Typography } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import VideoUpload from '../../../utils/VideoUpload.js';
import {Link} from 'react-router-dom'

const RegisterFace = (props) => {
  
  const [start, setStart] = useState(true);
  const [video, setVideo] = useState('');


  const updateStartHandler = (end) => {
    setStart(end);
  };

  const saveVideoHandler = (faceVideo) => {
    setVideo(faceVideo);
  };


  const submitHandler = () => {
    //서버에 넣은 값들을 request에 보낸다
    
    
  };



  if (start) {
    return (
      <VideoUpload updateStartHandler={updateStartHandler} saveVideoHandler={saveVideoHandler} />
    );
  } else {
    return (
      <>
        <Result
          status="success"
          title="얼굴 등록이 완료되었습니다!"
          subTitle="다음으로 수강중인 수업을 등록해주세요."
          extra={[
            <Button type="primary" key="save">
              <Link to="/course">수업 등록</Link>
            </Button>,
          ]}
        />
        ,
      </>
    );
  }
};

export default RegisterFace;
