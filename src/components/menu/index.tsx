import Menu, {MenuProps} from "./Menu";
import MenuItem, {MenuItemProps} from './MenuItem';
import SubMenu, {SubMenuProps} from "./SubMenu";
import {FC} from "react";

type combineType = FC<MenuProps> & {
    item: FC<MenuItemProps>,
    subMenu: FC<SubMenuProps>;
};
const CombineMenu = Menu as combineType;
CombineMenu.item = MenuItem;
CombineMenu.subMenu = SubMenu;


export default CombineMenu;
