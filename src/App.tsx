import React, {useState} from 'react';

//todo 套娃引用sun-ui
// import "sun-ui/dist/index.css";
// import {Button, Menu, Input, AutoComplete} from "sun-ui";

// 开发的
import './style/index.less';
import Button from './components/button/Button';
import Menu from './components/menu';
import Icon from "./components/icon/Icon";
import Input from './components/input/Input';
import AutoComplete from "./components/autoComplete/AutoComplete";
import Select from "./components/select";
const Option = Select.option;

const App: React.FC = () => {

    const [inputValue,setInputValue] = useState();

    const [dataSource, setDataSource] = useState([] as any[]);

    const [testSelectVal, setTestSelectVal] = useState('tade');

    return (
        <div className="App">
            <div>
                <Icon type="iconxiangxia" />
            </div>
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
                <Menu onSelect={(index) => {
                    console.log('11', index)
                }}>
                    <Menu.item>
                        3232
                    </Menu.item>
                    <Menu.item>
                        3333
                    </Menu.item>
                    <Menu.item>
                        4444
                    </Menu.item>
                    <Menu.subMenu title="我的天">
                        <Menu.item>
                            我的天-1111
                        </Menu.item>
                        <Menu.item>
                            我的天-2222
                        </Menu.item>
                    </Menu.subMenu>
                </Menu>
                <Menu mode="vertical" defaultIndex="2" onSelect={(index) => {
                    console.log('11', index)
                }}>
                    <Menu.item>
                        5555
                    </Menu.item>
                    <Menu.item>
                        6666
                    </Menu.item>
                    <Menu.item>
                        7777
                    </Menu.item>
                    <Menu.subMenu title="我的天-vertiacal">
                        <Menu.item>
                            我的天-1111
                        </Menu.item>
                        <Menu.item>
                            我的天-2222
                        </Menu.item>
                    </Menu.subMenu>
                </Menu>
            </div>
            <div style={{margin: '20px', width: "240px"}}>
                <Input
                    placeholder="电话号码"
                    addonBefore="手机"
                    value={inputValue}
                    onChange={(e) => {
                        console.log('e', e.target.value);
                        setInputValue(e.target.value);
                    }}
                />
            </div>
            <div style={{margin: '20px', width: "240px"}}>
                <AutoComplete
                    placeholder="搜索内容"
                    dataSource={dataSource}
                    onSearch={(searchText)=>{
                        let resultDataSource = !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)];
                        console.log('resultDataSource', resultDataSource);
                        setDataSource(resultDataSource);
                    }}
                    onSelect={(item)=>{
                        console.log('onSelect', item);
                    }}
                />
            </div>
            <div style={{margin: '20px', width: "240px"}}>
                <Select
                    placeholder="请选择"
                    // value={testSelectVal}
                    onChange={(value)=>{
                        setTestSelectVal(value);
                    }}
                >
                    <Option value="wde" disabled={true}>我的</Option>
                    <Option value="tade">他的</Option>
                    <Option value="nide">你的</Option>
                </Select>
            </div>
        </div>
    );
};

export default App;
