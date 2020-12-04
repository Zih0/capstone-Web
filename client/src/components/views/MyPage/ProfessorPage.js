import React, { useState, useEffect } from 'react';
import { Typography, Divider, Tabs, Table } from 'antd';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

const { Title } = Typography;

const { TabPane } = Tabs;

const CheckContetns = () => {
	const user = useSelector((state) => state.user);
	const [TableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(true);
	const getCheck = () => {
		return new Promise((resolve, reject) => {
			let body = {
				name: user.userData.name,
				major: user.userData.major,
			};
			axios.post('/api/datas/check/professor', body).then((response) => {
				if (response.data.success) {
					const Courses = response.data.checkList;
					async function findcourses(Courses) {
						let Check = [];
						let DataSet = [];
						let name = '';
						let key = '';
						Courses.forEach((course) => {
							course.forEach((element) => {
								Check.push({
									id: element.studentid,
									face: element.face,
									gesture: element.gesture,
									week: element.week,
								});
								name = element.name;
								key = element.key;
							});
							if (course !== []) {
								DataSet.push({ key: key, name: name, check: Check });
								Check = [];
								name = '';
							}
						});
						return DataSet;
					}
					async function main(Courses) {
						const a = await findcourses(Courses);
						return a;
					}
					const result = main(Courses);
					resolve(result);
				} else {
					alert('정보를 가져오는데 실패했습니다.');
				}
			});
		});
	};
	useEffect(() => {
		const fetchCheck = async () => {
			const Data = await getCheck();

			setTimeout(() => {
				setTableData(Data);
				setLoading(false);
			}, 3000);
		};

		fetchCheck();
	}, []);

	const columns = [
		{
			title: '주차',
			key: 'week',
			dataIndex: 'week',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.week - b.week,
		},
		{
			title: '학번',
			key: 'id',
			dataIndex: 'id',
		},
		{
			title: '얼굴인증',
			key: 'face',
			dataIndex: 'face',
		},
		{
			title: '제스쳐인증',
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
					<Title>출석부</Title>
					<Divider />

					<Tabs defaultActiveKey="1">
						{TableData.map((pane) => (
							<TabPane tab={pane.name} key={pane.key}>
								<Table bordered columns={columns} size="small" dataSource={pane.check}></Table>
							</TabPane>
						))}
					</Tabs>
				</div>
			</Fade>
		);
	}
};

export default CheckContetns;
