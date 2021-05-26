import React, {FC, useState, useRef, useEffect} from 'react';
import Modal, { ModalProps } from "./Modal";
import ReactDOM from 'react-dom';

export interface containerProps extends Omit<ModalProps,'visible'>{
    onRemove: () => void
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
       cancelText = '取消',
       okText = '确定',
       title,
       centered = false,
       onCancel ,
       onOk,
}) => {

    const [visible, setVisible] = useState(true);

    return (
        <Modal
            isPortal={false}
            centered={true}
            isShowModalHead={false}
            visible={visible}
            destroyOnClose={true}
        >
            <div onClick={()=>{
                setVisible(false);
            }}>woshitiancai</div>
        </Modal>
    );
};

export default function Container() {
    const div = document.createElement('div');
    document.body.appendChild(div);

    function removeChild() {
        const unmountResult = ReactDOM.findDOMNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    ReactDOM.render(
        <ContainerModal onRemove={removeChild} />, div
    );
}

