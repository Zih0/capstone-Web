## 화상 강의 출석체크 - web

### MongoDB , Express , React.js , Node.js

1~3주차 : 아이디어 선정, 기획       
4주차 : 회원가입, 로그인 페이지 (boilerplate + upgrade)     
5주차 : 얼굴 등록 페이지 개발(react-webcam 라이브러리 사용), 서버 및 DB 연동  
6주차 : 수업 등록 페이지 개발 (antd table), DB에서 수업 정보 불러오기까지 구현  
7주차 : 수업 등록페이지 완성 (수강중인 수업 체크 후, 등록 버튼 누르면 DB 수업Collection의 해당 수업들 students Array에 로그인되어 있는 학생의 학번 등록)  

8주차 : 중간고사 (얼굴 등록 페이지 웹캠/파일 업로드 두가지 방법 구현) 예정
9주차 : 중간데모


## 웹페이지

### 교수님 페이지

회원가입 - 학과 선택, 신분증 인증 후 가입 처리

![CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.33.04.png](CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.33.04.png)

출석부 - 출석 프로그램으로 출석한 수업만 불러 옴.

![CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.33.26.png](CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.33.26.png)

### 학생 페이지

회원가입 - 학생증 또는 e-id에서 학번 추출

![CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.29.09.png](CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.29.09.png)

![CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.32.50.png](CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.32.50.png)

얼굴 등록 - PC의 경우, 웹캠 또는 동영상으로 등록 가능 ( 10초 녹화 ) , 모바일의 경우 핸드폰 카메라와 동영상으로 등록 가능

[react-webcam](https://github.com/mozmorris/react-webcam)

[react-dropzone](https://react-dropzone.js.org/)

![CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.31.49.png](CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.31.49.png)

수업 등록 - 수강중인 수업 등록

![CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.32.21.png](CAPSTONE%202d33f200735d4fa2a5e30ece2f871dc6/_2020-12-09__8.32.21.png)
