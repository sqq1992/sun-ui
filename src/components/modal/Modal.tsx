import React, {FC, useState, useRef, useEffect} from 'react';
import Classnames from 'classnames';
import Icon from "../icon/Icon";
import Button from '../button/Button';
import DefineTransition from "../transition/Transition";
import Portal from "../portal/Portal";


export interface ModalProps {
    className?: string;
    afterClose?: () => void;
    onCancel?: () => void;
    onOk?: () => void;
    bodyStyle?: React.CSSProperties;
    cancelText?: string;
    okText?: string;
    title?: string;
    centered?: boolean;
    closable?: boolean;
    destroyOnClose?: boolean;
    footer?: null | React.ReactNode;
    keyboard?: boolean;
    mask?: boolean;
    maskclosable?: boolean;
    visible: boolean;
    width?: string;
}

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const Modal: FC<ModalProps> = ({
       className = '',
       children,
       cancelText = '取消',
       okText = '确定',
       bodyStyle,
       closable = true,
       title,
       footer,
       centered = false,
       mask = true,
       visible = false,
       onCancel ,
       onOk,
       destroyOnClose = false,
}) => {


    const bodyOverflow = useRef(window.getComputedStyle(document.body).overflow);
    const [isShowAnimate, setIsShowAnimate] = useState(false);
    const [isShowDisplay, setIsShowDisplay] = useState(false);
    const isFirstVisible = useRef(false);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
            if(!isFirstVisible.current){        //初次渲染显示
                setIsShowDisplay(visible);
                setTimeout(()=>{
                    isFirstVisible.current = true;
                    setIsShowAnimate(visible);
                })
            }else {
                setIsShowDisplay(visible);
                setIsShowAnimate(visible);
            }


        } else {
            document.body.style.overflow = bodyOverflow.current;
            setIsShowAnimate(visible);
        }
    }, [visible]);

    //events
    let handleClose = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleOk = () => {
        if (onOk) {
            onOk();
        }
    };


    // format value
    let boxClsName = Classnames({
        'sun-modal-root': true,
        'modal-centered': centered,
        'modal-hidden': !isShowDisplay || !isFirstVisible.current,
        [`${className}`]: true,
    });

    let setFooter = () => {
        if (footer) {
            return (
                <div className="modal-footer">
                    {footer}
                </div>
            )
        }
        return (
            <div className="modal-footer">
                <Button className="" onClick={handleClose}>{cancelText}</Button>
                <Button type="primary" onClick={handleOk}>{okText}</Button>
            </div>
        )
    };

    return (
        <Portal
            visible={visible}
        >
            <DefineTransition
                in={isShowAnimate}
                unmountOnExit={destroyOnClose}
                onExited={() => {
                    setIsShowDisplay(visible);
                }}
                animation="zoom-modal-in-top"
            >
                <div className={boxClsName}>
                    {mask && (
                        <div className="modal-mask" />
                    )}
                    <div className="modal-wrap">
                        <div className="sun-modal">
                            <div className="modal-content">
                                <div className="modal-head">
                                    <div className="modal-head-title">{title}</div>
                                    {closable && (
                                        <div className="modal-close-icon" onClick={handleClose}>
                                            <Icon type="icondelete" className="delete-icon"/>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-body" style={bodyStyle}>
                                    {children}
                                </div>
                                {footer !== null && setFooter()}
                            </div>
                        </div>
                    </div>
                </div>
            </DefineTransition>
        </Portal>

    );
};


export default Modal;
