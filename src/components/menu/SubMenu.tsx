import React, {useContext, useState} from 'react';
import Classnames from 'classnames';
import {MenuItemProps} from "./MenuItem";
import {MenuContext} from "./Menu";
import DefineTransition from '../transition/Transition';

interface SubMenuProps {
    title: string,
    className?: string;
    style?: React.CSSProperties,
    index?: string;
}


const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {className, style, children, title, index} = props;
    const context = useContext(MenuContext);
    const [isMenuOpen, setMenuOpen] = useState(false);


    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        setMenuOpen(toggle);
    };

    const onClickEvents = context.mode === "vertical" ? {
        onClick: (e: React.MouseEvent) => {
            setMenuOpen(!isMenuOpen);
        }
    } : {};

    const hoverEventsObj = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
    } : {}

    let renderChildren = () => {

        let childElement = React.Children.map(children, (child, smallIndex) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            let {displayName} = childElement.type;
            if(displayName==="MenuItem"){
                return React.cloneElement(childElement,{
                    index:`${index}-${smallIndex}`
                })
            }else {
                console.error("这不是一个menuItem组件")
            }
        });
        let innerUlClassName = Classnames('submenu', {
            'menu-opened': isMenuOpen,
        });

        return (
            <DefineTransition
                in={isMenuOpen}
                animation="zoom-in-top"
            >
                <ul className={innerUlClassName}>
                    {childElement}
                </ul>
            </DefineTransition>
        );
    };


    let boxClassName = Classnames('menu-item submenu-item', {
        [`${className}`]: true,
        'active': context.index === index,
    });

    return (
        <li
            className={boxClassName}
            style={style}
            {...hoverEventsObj}
        >
            <div className="submenu-title" {...onClickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    );
};

SubMenu.displayName = "SubMenu";
SubMenu.defaultProps = {
    className:'',
    title: '测试subMenu'
};

export default SubMenu;
