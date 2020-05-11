import React, {createContext, useState} from 'react';
import Classnames from 'classnames';
import {MenuItemProps} from "./MenuItem";


type modeText = 'horizontal' | 'vertical';

interface MenuProps {
    className?: string;
    mode?: modeText,
    defaultIndex?: string,
    style?: React.CSSProperties,
    onSelect?: (selectIndex: string) => void
}

interface IMenuContext {
    index: string;
    mode?: modeText,
    onSelect?: (selectIndex: string) => void
}

export const MenuContext = createContext<IMenuContext>({index: '0'})
const Menu: React.FC<MenuProps> = (props) => {
    const {className, mode, defaultIndex, style, children, onSelect} = props;
    const [currentActive, setActive] = useState(defaultIndex);
    let boxClassName = Classnames('menu', {
        [`${className}`]: true,
        'menu-vertical': mode === "vertical",
        'menu-horizontal': mode === "horizontal",
    });

    let handleClick = (index: string) => {
        setActive(index);
        if(onSelect){
            onSelect(index);
        }
    };

    let menuChildrenValue: IMenuContext = {
        index: currentActive ? currentActive : '0',
        mode,
        onSelect: handleClick
    };

    let renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            let {displayName} = childElement.type;

            if(displayName==="MenuItem" || displayName==="SubMenu"){
                return React.cloneElement(childElement,{
                    index: index.toString()
                })
            }else {
                console.error("这不是一个menuItem或者SubMenu组件");
            }
        });

    };

    return (
        <ul
            className={boxClassName}
            style={style}
        >
            <MenuContext.Provider value={menuChildrenValue}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

Menu.defaultProps = {
    className:'',
    defaultIndex: '0',
    mode: "horizontal"
};

export default Menu;
