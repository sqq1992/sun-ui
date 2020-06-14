
import Select, { SelectProps } from "./Select";
import Option, {selectOptionProps} from "./Option";
import {FC} from "react";

type combineSelectType = FC<SelectProps> & {
    option:FC<selectOptionProps>
};

const combineSelect = Select as combineSelectType;
combineSelect.option = Option;

export default combineSelect;
