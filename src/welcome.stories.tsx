
import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
    .add('welcome', () => {
        return (
            <>
                <h1>欢迎来到sun-ui组件库</h1>
                <h3>安装试试</h3>
                <code>
                    npx -p @storybook/cli sb init
                </code>
            </>
        )
    }, { info : { disable: true }})
