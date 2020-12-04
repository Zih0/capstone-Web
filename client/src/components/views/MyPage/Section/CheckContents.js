import React, { useState, useEffect } from 'react';
import { Typography, Divider, Tabs, Table } from 'antd';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

const { Title } = Typography;

const { TabPane } = Tabs;

const CheckContetns = () => {
	const user = useSelector((state) => state.user);
	const [Courses, setCourses] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(true);
	const getCheck = () => {
		return new Promise((resolve, reject) => {
			let body = {
				userId: user.userData.studentId,
			};
			axios.post('/api/datas/check', body).then((response) => {
				if (response.data.success) {
					console.log(response.data.checkList);
					resolve(response.data.checkList);
				} else {
					alert('수업 정보를 가져오는데 실패했습니다.');
				}
			});
		});
	};
	useEffect(() => {
		const fetchCheck = async () => {
			const Data = await getCheck();
			console.log(Data);
			setTimeout(() => {
				setTableData(Data);
				setLoading(false);
			}, 1000);

			console.log(loading);
			console.log(Data);
		};

		fetchCheck();
	}, []);

	const columns = [
		{
			title: '주차',
			key: 'week',
			dataIndex: 'week',
		},
		{
			title: '얼굴',
			key: 'face',
			dataIndex: 'face',
		},
		{
			title: '제스쳐',
			key: 'gesture',
			dataIndex: 'gesture',
		},
	];

	if (loading) {
		return (
			<Fade>
				<div className="contents" style={{ width: '100%', overflowX: 'scroll' }}>
					<Title>마이페이지</Title>
					<Title level={5}>출석체크 확인</Title>
					<Divider />
					<Table columns={columns} loading={loading}></Table>
				</div>
			</Fade>
		);
	} else {
		return (
			<Fade>
				<div className="contents" style={{ width: '100%', overflowX: 'scroll' }}>
					<Title>마이페이지</Title>
					<Title level={5}>출석체크 확인</Title>
					<Divider />
					<Tabs defaultActiveKey="1" style={{ overflowX: 'scroll' }}>
						{tableData.map((pane) => (
							<TabPane tab={pane.name} key={pane.name}>
								<Table columns={columns} dataSource={pane.check}></Table>
							</TabPane>
						))}
					</Tabs>
				</div>
			</Fade>
		);
	}
};

export default CheckContetns;
