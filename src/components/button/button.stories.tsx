import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

const defaultButton = () => {
    return (
        <Button onClick={action('clicked')}>default button</Button>
    );
};
const buttonTypes = () => {
    return (
        <div>
            <Button type="primary" size="large">primary large button</Button>
            <Button type="danger" size="middle">danger middle button</Button>
            <Button type="link" size="small">link small button</Button>
        </div>
    );
};


storiesOf('Button', module)
    .add('按钮默认属性', defaultButton)
    .add('按钮风格大小', buttonTypes)
