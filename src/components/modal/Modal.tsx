import React, {FC, useState, createContext} from 'react';
import Classnames from 'classnames';
import Icon from "../icon/Icon";
import Button from '../button/Button';


export interface ModalProps {
    className?: string;
    afterClose?: () => {};
    onCancel?: () => {};
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
    visible?: boolean;
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
    } = props;


    // format value
    let boxClsName = Classnames({
        'sun-modal-root': true,
        'modal-centered': centered,
        [`${className}`]: true,
    });

    let setFooter = () => {
        if(footer){
            return(
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
        <div className={boxClsName}>
            <div className="modal-content">
                <div className="modal-head">
                    <div className="head-title">{title}</div>
                    {closable && (
                        <div className="modal-close-icon">
                            <Icon type="icondelete"/>
                        </div>
                    )}
                </div>
                <div className="modal-body" style={bodyStyle}>
                    {children}
                </div>
                {footer !== null && setFooter()}
            </div>
            {mask && (
                <div className="modal-mask"></div>
            )}
        </div>
    );
};

Modal.defaultProps = {
    className:"",
    cancelText: "取消",
    okText: "确定",
    centered: false,
    closable: true,
    destroyOnClose: true,
    keyboard: true,
    mask: true,
    maskclosable: true,
    visible: false,
};

export default Modal;
