import React from 'react';

import './style/index.less';

import Button from './components/button/Button';
import Menu from './components/menu/Menu';
import MenuItem from "./components/menu/MenuItem";
import SubMenu from "./components/menu/SubMenu";

const App: React.FC = () => {
  return (
      <div className="App">
        <div className="button-box">
            <Button type="default" autoFocus={true}>default</Button>
            <Button type="primary">primary</Button>
            <Button type="danger">danger</Button>
            <Button type="link">link</Button>
            <Button size="large">large</Button>
            <Button size="middle" disabled={true}>default</Button>
            <Button size="small">small</Button>
            <Button size="small" target="_blank" href="https://juejin.im/timeline">掘金</Button>
        </div>
        <div>
            <Menu onSelect={(index)=>{console.log('11',index)}}>
                <MenuItem >
                    3232
                </MenuItem>
                <MenuItem >
                    3333
                </MenuItem>
                <MenuItem >
                    4444
                </MenuItem>
                <SubMenu title="我的天">
                    <MenuItem >
                        我的天-1111
                    </MenuItem>
                    <MenuItem >
                        我的天-2222
                    </MenuItem>
                </SubMenu>
            </Menu>
            <Menu mode="vertical" defaultIndex="2" onSelect={(index)=>{console.log('11',index)}}>
                <MenuItem >
                    5555
                </MenuItem>
                <MenuItem >
                    6666
                </MenuItem>
                <MenuItem>
                    7777
                </MenuItem>
                <SubMenu title="我的天-vertiacal">
                    <MenuItem >
                        我的天-1111
                    </MenuItem>
                    <MenuItem >
                        我的天-2222
                    </MenuItem>
                </SubMenu>
            </Menu>
        </div>
      </div>
  );
};

export default App;
