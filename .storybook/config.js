import {configure, addDecorator, addParameters} from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import "../src/style/index.less";

const wrapperStyle = {
    padding: '20px 40px'
};
const storyWrapper = (stroyFn) => (
    <div style={wrapperStyle}>
        <h1>组件展示</h1>
        {stroyFn()}
    </div>
);

addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})

function loadStories() {
    const allExports = [require('../src/welcome.stories.tsx')];
    const req = require.context('../src/components', true, /\.stories\.tsx$/);
    req.keys().forEach(fname => allExports.push(req(fname)));
    return allExports;
}

configure(loadStories, module);

