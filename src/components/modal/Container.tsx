import React, {FC, useState} from 'react';
import Modal, { ModalProps } from "./Modal";
import ReactDOM from 'react-dom';
import Button from "../button/Button";

export interface containerProps extends Omit<ModalProps,'visible'>{
    onRemove?: () => void
    icon?: React.ReactNode
    type?: 'info' | 'success' | 'error' | 'warning' | 'confirm'
    content?: React.ReactNode
}

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const ContainerModal: FC<containerProps> = ({
       className = '',
       cancelText = '',
        onRemove,
       okText = '知道了',
       title="提示信息",
       onCancel ,
       onOk,
        icon,
        width = 416,
        type = "info",
        content
}) => {

    const [visible, setVisible] = useState(true);


    const handleCancel = () => {
        setVisible(false)
        onCancel && onCancel();
    };
    const handleOk = () => {
        setVisible(false)
        onOk && onOk();
    };

    const handleExitedCb = () => {
        onRemove && onRemove();
    };

    let footer = null as any;
    if(okText || cancelText){
        footer = (
            <div className="container-btns">
                {cancelText && (
                    <Button className="" onClick={handleCancel}>{cancelText}</Button>
                )}
                {okText && (
                    <Button type="primary" onClick={handleOk}>{okText}</Button>
                )}
            </div>
        )
    }

    return (
        <Modal
            isPortal={false}
            centered={true}
            isShowModalHead={false}
            visible={visible}
            destroyOnClose={true}
            footer={footer}
            width={width}
            className={`${className} ${type}`}
            onExited={handleExitedCb}
        >
            <div className="container-body">
                <div className="con-ico">{icon}</div>
                <div className="con-title">{title}</div>
                <div className="con-cont">{content}</div>
            </div>
        </Modal>
    );
};

export default function Container(props:containerProps) {
    const div = document.createElement('div');
    document.body.appendChild(div);

    function removeChild() {
        const unmountResult = ReactDOM.findDOMNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    ReactDOM.render(
        <ContainerModal onRemove={removeChild} {...props} />, div
    );
}

