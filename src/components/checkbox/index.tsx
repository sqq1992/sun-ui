
import Checkbox, { CheckboxProps } from "./Checkbox";
import {FC} from "react";

type combineCheckboxType = FC<CheckboxProps> & {

};

const combineCheckbox = Checkbox as combineCheckboxType;

export default combineCheckbox;
