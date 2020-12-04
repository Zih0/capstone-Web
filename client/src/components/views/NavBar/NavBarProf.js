import React, { useState } from 'react';
import RightMenuProf from './Sections/RightMenuProf';
import { Drawer, Button,  } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';

function NavBarProf() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/proffesor">
          <img src="https://user-images.githubusercontent.com/60956392/95540373-9be0bb00-0a2b-11eb-8a64-b237b0b8a9c1.png" alt="small-log" height="35px" />
        </a>
      </div>
      <div className="menu__container">
        <div className="menu_rigth">
          <RightMenuProf mode="horizontal" />
        </div>
        <Button className="menu__mobile-button" type="primary" onClick={showDrawer}>
        <AlignRightOutlined />
        </Button>
        <Drawer title="메뉴" placement="right" className="menu_drawer" closable={false} onClose={onClose} visible={visible}>
          <RightMenuProf mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBarProf;
