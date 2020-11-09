import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { LoadingOutlined } from '@ant-design/icons';
import {Typography } from 'antd';
import axios from "axios";
import { useSelector } from 'react-redux';


const {Paragraph, Text} = Typography;

const ImgUpload = (props) => {
    const user = useSelector((state) => state.user);
    const [Image, setImage] = useState([]);
    const onDrop = useCallback(
    (files) => {
      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append('studentid', user.userData.studentId);
      formData.append("file", files[0]);

      axios.post("/api/datas/image", formData, config).then((response) => {
        if (response.data.success) {
          setImage([...Image, response.data.filePath]);
          props.refreshFunction([...Image, response.data.filePath]);
          console.log(Image)
        } else {
          alert("파일을 저장하는데 실패했습니다.");
        }
      });
    },
    [Image]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const DeleteHandler = (image) => {
    const currentIndex = Image.indexOf(image);

    let newImage = [...Image];
    newImage.splice(currentIndex, 1);
    setImage(newImage);
    props.refreshFunction(newImage);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <section className="container">
        <div
          style={{
            width: 200,
            height: 160,
            border: "1px solid lightgray",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <LoadingOutlined  style={{ fontSize: "3rem" }} />
          ) : (
            <Paragraph style={{ fontSize: "1rem", textAlign:'center' }}> 학생증 사진을 <Text type="danger">드래그</Text>하거나,
            <br/>박스를  <Text type="danger">클릭</Text>해주세요 </Paragraph> 
          )}
        </div>
      </section>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Image.map((image, index) => (
          <div onClick={() => DeleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "200px", width: "200px", height: "160px",marginLeft:'1rem'}}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgUpload;
