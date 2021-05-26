
import Modal , { ModalProps } from "./Modal";
import {FC} from "react";
import Container from "./Container";

type combineModalType = FC<ModalProps> & {
    info: () => void
};

const combineModal = Modal as combineModalType;
combineModal.info = Container

export default combineModal;
