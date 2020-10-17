import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Progress, Button, Typography } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';


const { Title } = Typography;

const VideoUpload = (props) => {
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
      if (percentage >= 20) {
        setCapturing(false);
        clearInterval(timer);
        mediaRecorderRef.current.stop();

        SaveHandler(recordedChunks);

        props.updateStartHandler(false);
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
    const blob = new Blob(file, {
      type: 'video/webm',
    });
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('studentid', user.userData.studentId);
    formData.append('file', blob);

    axios.post('/api/datas/uploadfile', formData, config).then((response) => {
      if (response.data.success) {
        setVideo(response.data.filePath);
        props.saveVideoHandler(response.data.filePath);
        
      } else {
        alert('파일을 저장하는데 실패했습니다.');
      }
    });
    setRecordedChunks([]);
  };

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
};

export default VideoUpload;
