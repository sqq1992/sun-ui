import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';

const defaultInput = () => {
    return (
        <div style={{width:'380px'}}>
            <div style={{marginBottom:'10px'}}>
                <Input onChange={(e)=>{
                    action("input")
                }} placeholder="默认输入框" />
            </div>
            <div style={{marginBottom:'10px'}}>
                <Input addonBefore="前缀" placeholder="默认输入框" />
            </div>
            <div >
                <Input addonAfter="后缀" placeholder="默认输入框2" />
            </div>
        </div>

    );
};
const inputTypes = () => {
    return (
        <div>
            <Input type="primary" size="large" />
            <Input type="danger" size="default" />
            <Input type="link" size="small" />
        </div>
    );
};


storiesOf('Input', module)
    .add('输入框默认属性', defaultInput)
    .add('输入框大小', inputTypes)
