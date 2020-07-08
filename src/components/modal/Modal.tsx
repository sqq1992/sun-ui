import React, {FC, useState, useRef, useEffect} from 'react';
import Classnames from 'classnames';
import Icon from "../icon/Icon";
import Button from '../button/Button';
import DefineTransition from "../transition/Transition";
import Portal from "../portal/Portal";


export interface ModalProps {
    className?: string;
    afterClose?: () => {};
    onCancel?: () => void;
    onOk?: () => {};
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
const Modal: FC<ModalProps> = (props) => {
    let {
        className,
        children,
        cancelText,
        okText,
        bodyStyle,
        closable,
        title,
        footer,
        centered,
        mask,
        visible,
        onCancel,
        destroyOnClose
    } = props;

    const bodyOverflow = useRef(window.getComputedStyle(document.body).overflow);
    const componentRef = useRef<HTMLDivElement>(null);
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
                <Button className="">{cancelText}</Button>
                <Button type="primary">{okText}</Button>
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
                <div className={boxClsName} ref={componentRef}>
                    {mask && (
                        <div className="modal-mask"></div>
                    )}
                    <div className="modal-wrap">
                        <div className="sun-modal">
                            <div className="modal-content">
                                <div className="modal-head">
                                    <div className="head-title">{title}</div>
                                    {closable && (
                                        <div className="modal-close-icon" onClick={handleClose}>
                                            <Icon type="icondelete"/>
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

Modal.defaultProps = {
    className: "",
    cancelText: "取消",
    okText: "确定",
    centered: false,
    closable: true,
    destroyOnClose: false,
    keyboard: true,
    mask: true,
    maskclosable: true,
    visible: false,
};

export default Modal;