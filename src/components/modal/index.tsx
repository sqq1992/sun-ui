
import Modal , { ModalProps } from "./Modal";
import React,{FC} from "react";
import Container, { containerProps } from "./Container";
import Icon from "../icon/Icon";

type combineModalType = FC<ModalProps> & {
    info: (props:containerProps) => void
    success: (props:containerProps) => void
    error: (props:containerProps) => void
    warning: (props:containerProps) => void
    confirm: (props:containerProps) => void
};

const combineModal = Modal as combineModalType;
combineModal.info = function (props:containerProps) {
    return Container(Object.assign({}, {
        type:'info',
        icon: <Icon type="iconiconset0144"/>
    }, props));
}
combineModal.success = function (props:containerProps) {
    return Container(Object.assign({}, {
        type:'success',
        icon: <Icon type="icondagou"/>
    }, props));
}
combineModal.error = function (props:containerProps) {
    return Container(Object.assign({}, {
        type:'error',
        icon: <Icon type="iconcuowu"/>
    }, props));
}
combineModal.warning = function (props:containerProps) {
    return Container(Object.assign({}, {
        type:'warning',
        icon: <Icon type="iconjinggao"/>
    }, props));
}
combineModal.confirm = function (props:containerProps) {
    return Container(Object.assign({}, {
        type:'confirm',
        icon: <Icon type="iconjinggao"/>,
        cancelText: '取消',
        okText: '确认',
    }, props));
}

export default combineModal;
