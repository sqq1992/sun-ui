import React, {FC, useState} from 'react';
import Classnames from 'classnames';
import Icon from '../icon/Icon';
import DefineTransition from "../transition/Transition";

type alertTypes = 'success' | 'info' | 'warning' | 'error';


interface alertProps {
    afterClose?: () => void;
    closable?: boolean;
    description?: React.ReactNode;
    message?: React.ReactNode;
    type?: alertTypes;
    onClose?: () => void;
}


/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const Alert: FC<alertProps> = ({
       afterClose,
       closable,
       description="description",
       message="message",
       type = "success",
       onClose
}) => {

    const [isShowAnimate, setIsShowAnimate] = useState(true);

    let boxClsName = Classnames({
        'sun-alert': true,
        [type]: true
    });


    const handleClose = () => {
        setIsShowAnimate(false);
        onClose && onClose();
    };

    return (
        <DefineTransition
            in={isShowAnimate}
            unmountOnExit={true}
            onExited={() => {
                afterClose && afterClose();
            }}
            animation="zoom-modal-in-top"
        >
            <div className={boxClsName}>
                <div className="sun-alert-content">
                    <div className="sun-alert-message">{message}</div>
                    <div className="sun-alert-description">{description}</div>
                </div>
                {closable && (
                    <div className="sun-alert-close" onClick={handleClose}>
                        <Icon type="icondelete"/>
                    </div>
                )}
            </div>
        </DefineTransition>
    );
};



export default Alert;
