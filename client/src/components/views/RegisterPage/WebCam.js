import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Progress, Button, Result } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const videoConstraints = {
  facingMode: 'user',
};

const WebCam = () => {
  const user = useSelector((state) => state.user);
  const [start, setStart] = useState(true);
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
        clearInterval(timer);
        mediaRecorderRef.current.stop();
        setStart(false);
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
      } else {
        alert('파일을 저장하는데 실패했습니다.');
      }
    });
    setRecordedChunks([]);
  };

  if (start) {
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          height={230}
          mirrored={true}
          videoConstraints={videoConstraints}
        />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {capturing ? (
            <p> 녹화중 📹 </p>
          ) : (
            <Button onClick={StartCaptureClickHandler}>영상녹화시작</Button>
          )}
        </div>
        <Progress percent={percent} showInfo={false} strokeWidth={13} />

        {/* {recordedChunks.length > 0 && <button onClick={handleDownload}>Download</button>} */}
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
              수업 등록
            </Button>,
          ]}
        />
        ,
      </>
    );
  }
};

export default WebCam;
