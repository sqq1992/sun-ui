import React, {Component, useState} from 'react';

//todo 测试UI库

//todo 套娃引用sun-ui
// import "sun-ui/dist/index.css";
// import {Button, Menu, Input, AutoComplete, Icon, Modal, Tabs, Select} from "sun-ui";
// const Option = Select.option;

// 开发的
import './style/index.less';
import Button from './components/button/Button';
import Menu from './components/menu';
import Icon from "./components/icon/Icon";
import Input from './components/input/Input';
import AutoComplete from "./components/autoComplete/AutoComplete";
import Tabs from './components/tabs';
import Select from "./components/select";
import Modal from "./components/modal";
import Alert from './components/alert';
import Progress from './components/progress';
import Checkbox from './components/checkbox/Checkbox';
const Option = Select.option;


const TempCom = () => {

    const [modalVisible,setModalVisible] = useState(false);

    return (
        <div>
            <Modal
                title="标题2"
                centered={true}
                visible={modalVisible}
            >
                <div>我的天2内容</div>
            </Modal>
            <div onClick={()=>{
                setModalVisible(true)
            }}>我的天2</div>
        </div>
    );
};

const App: React.FC = () => {

    const [isChecked,setIsChecked] = useState(false);

    const [dataSource, setDataSource] = useState([] as any[]);

    const [testSelectVal, setTestSelectVal] = useState('tade');

    const [modalVisible,setModalVisible] = useState(false);

    let handleOpenModal = () => {

        //todo 1
        // setModalVisible(true);

        //todo 2
        Modal.confirm({
            content:'我的天',
            // onOk:()=>{
            //     console.log('wde')
            // }
        });
    };

    let handleCloseModal = () => {
        setModalVisible(false);
    };

    let handleChangeCheck = (e,checked) => {
        // setIsChecked(checked)
    };

    return (
        <div className="App">
            <div>
                <Checkbox checked={isChecked} onChange={handleChangeCheck} />
            </div>
            <Progress percent={34} />
            <Alert
                message="我是message"
                description="我是description"
                closable={true}
            />
            <div className="button-box">
                <Button type="default" autoFocus={true} onClick={handleOpenModal}>openModal</Button>
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
                    defaultValue="我的"
                    // value={inputValue}
                    // onChange={(e) => {
                    //     console.log('e', e.target.value);
                    //     setInputValue(e.target.value);
                    // }}
                />
            </div>
            <div style={{margin: '20px', width: "240px"}}>
                <AutoComplete
                    placeholder="搜索内容"
                    dataSource={dataSource}
                    onSearch={(searchText) => {
                        let resultDataSource = !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)];
                        console.log('resultDataSource', resultDataSource);
                        setDataSource(resultDataSource);
                    }}
                    onSelect={(item) => {
                        console.log('onSelect', item);
                    }}
                />
            </div>
            <div style={{margin: '20px', width: "240px"}}>
                <Select
                    placeholder="请选择"
                    // value={testSelectVal}
                    // disabled={true}
                    onChange={(value) => {
                        setTestSelectVal(value);
                    }}
                >
                    <Option value="wde" disabled={true}>我的</Option>
                    <Option value="tade">他的</Option>
                    <Option value="nide">你的</Option>
                </Select>
            </div>
            <div>

                <Tabs>
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </Tabs.TabPane>
                </Tabs>

            </div>
            <div>
                <div>sunMOdal</div>
                <Modal
                    title="标题"
                    centered={true}
                    destroyOnClose={true}
                    visible={modalVisible}
                    onCancel={handleCloseModal}
                    onOk={handleCloseModal}
                >
                    <div>wp shi sun</div>
                    <TempCom />
                </Modal>
            </div>
        </div>
    );
};

export default App;
