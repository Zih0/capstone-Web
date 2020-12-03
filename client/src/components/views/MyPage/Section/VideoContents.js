import React, { useState, useEffect } from 'react';
import { Button, Typography, Divider, Row, Col, Modal } from 'antd';
import { useSelector } from 'react-redux';
import VideoUpload from '../../../../utils/VideoUpload';
import FileUpload from '../../../../utils/FileUpload';
import Fade from 'react-reveal/Fade';

const { Title } = Typography;

const VideoContents = () => {
	const user = useSelector((state) => state.user);
	const [path, setPath] = useState('');
	const [visiblewebcam, setVisiblewebcam] = useState(false);
	const [visiblefile, setVisiblefile] = useState(false);
	const [video, setVideo] = useState('');

	const saveVideoHandler = (faceVideo) => {
		setVideo(faceVideo);
	};

	useEffect(() => {
		if (user && user.userData.studentId) {
			setPath(`https://chul-check.tk/../uploads/embedding/${user.userData.studentId}.webm`);
		}
	}, [user]);

	const ShowWebcamHandler = () => {
		setVisiblewebcam(true);
	};
	const SaveWebcamHandler = () => {
		setVisiblewebcam(false);
	};
	const ShowFileHandler = () => {
		setVisiblefile(true);
	};
	const SaveFileHandler = () => {
		setVisiblefile(false);
	};

	return (
		<Fade>
			<div className="contents">
				<Title>마이페이지</Title>
				<Title level={5}>등록 영상</Title>
				<Divider />
				<Row justify="center">
					<Col span={24}>
						<video controls height="230">
							<source src={path} type="video/webm" />
						</video>
						<br />
						<div style={{ display: 'flex' }}>
							<Button onClick={ShowWebcamHandler}>웹캠으로 변경하기</Button>
							<Modal
								title="웹캠으로 등록하기"
								centered
								visible={visiblewebcam}
								footer={null}
								onCancel={SaveWebcamHandler}
								width={700}
							>
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<VideoUpload
										updateStartHandler={SaveWebcamHandler}
										saveVideoHandler={saveVideoHandler}
									/>
								</div>
							</Modal>
							<div style={{ marginLeft: '1rem' }}>
								<Button onClick={ShowFileHandler}>파일로 변경하기</Button>
								<Modal
									title="파일로 등록하기"
									centered
									visible={visiblefile}
									footer={null}
									onCancel={SaveFileHandler}
									width={700}
								>
									<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<FileUpload
											updateStartHandler={SaveFileHandler}
											saveVideoHandler={saveVideoHandler}
										/>
									</div>
								</Modal>
							</div>
						</div>
					</Col>
					<Col span={24}></Col>
				</Row>
			</div>
		</Fade>
	);
};

export default VideoContents;
