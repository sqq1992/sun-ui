import React, { FC } from 'react';
import Classnames from 'classnames';

type progressTypes = 'success' | 'info' | 'warning' | 'error';

interface alertProps {
    type?: progressTypes;
    showInfo?: boolean;
    percent?:number
}


/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const Progress: FC<alertProps> = ({
    type = "success",
    showInfo = true,
    percent
}) => {

    let boxClsName = Classnames({
        'sun-progress-bar': true,
        [type]: true
    });

    return (
        <div className={boxClsName}>
            <div className="progress-bar-outer">
                <div
                    className="progress-bar-inner"
                    style={{width: `${percent}%`}}
                >
                    {showInfo && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    );
};



export default Progress;
