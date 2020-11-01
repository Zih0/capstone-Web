import React,  { useState, useRef, useCallback } from 'react';
import { Progress,Button, Result,Typography } from 'antd';
import {Link} from 'react-router-dom'
import Webcam from 'react-webcam';
import axios from 'axios';
import { useSelector } from 'react-redux';


const { Title } = Typography;

const WebcamPage = (props) => {
    const [start, setStart] = useState(true);
    const user = useSelector((state) => state.user);
    const [percent, setPercent] = useState(0);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [video, setVideo] = useState('');
  
    const StartCaptureClickHandler = () => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
  
  
      let percentage = percent;
      const timer = setInterval(() => {
        percentage = percentage + 1;
        setPercent(percentage);
        if (percentage >= 100) {
          setCapturing(false);
          mediaRecorderRef.current.stop();
          SaveHandler(recordedChunks);
          setStart(false)
          clearInterval(timer);
        }
      }, 100);
    };
  
    const handleDataAvailable = useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const SaveHandler = (file) => {
      if (recordedChunks.length) {
        const blob = new Blob(file, {
          type: "video/webm"
        });
      
      let formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' },
      };
      formData.append('studentid', user.userData.studentId);
      formData.append('file', blob);
      console.log(recordedChunks);
      console.log(blob);
      
      axios.post('/api/datas/uploadfile', formData, config).then((response) => {
        if (response.data.success) {
          setVideo(response.data.filePath);
        } else {
          alert('파일을 저장하는데 실패했습니다.');
        }
      });
    }
    };
  

  if (start) {
    return (
        <>
          <div className="app">
            <Title>영상 등록</Title>
            <Webcam
              audio={false}
              ref={webcamRef}
              height={230}
            />
            <br />
            {capturing ? (
              <p> 녹화중 📹 </p>
            ) : (
              <Button onClick={StartCaptureClickHandler}>영상녹화시작</Button>
            )}
            <br />
            <div style={{ width: '300px' }}>
              <Progress percent={percent} showInfo={false} strokeWidth={13} />
            </div>
          </div>
        </>
      );
  } else {
    return (
      <>
        <Result
          status="success"
          title="얼굴 등록이 완료되었습니다!"
          subTitle="다음으로 수강중인 수업을 등록해주세요."
          extra={[
            <Button type="primary" key="save" onClick={() => SaveHandler(recordedChunks)}>
              <Link to="/course">수업 등록</Link>
            </Button>,
          ]}
        />
      </>
    );
  }
};

export default WebcamPage;
