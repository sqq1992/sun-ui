import React, {useContext} from 'react';
import Classnames from 'classnames';
import {MenuContext} from './Menu';


export interface MenuItemProps {
    index?: string,
    disabled?: boolean,
    className?: string;
    style?: React.CSSProperties,
}


const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {className, disabled, style, children, index} = props;

    const context = useContext(MenuContext)
    let boxClassName = Classnames('menu-item', {
        [`${className}`]: true,
        'disabled': disabled,
        'active': context.index === index
    });

    const handleClick = () => {
        if (context.onSelect && !disabled && context.index !== index && typeof index === "string") {
            context.onSelect(index);
        }
    };

    return (
        <li
            className={boxClassName}
            style={style}
            onClick={handleClick}
        >
            {children}
        </li>
    );
};

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = {
    className:'',
    disabled: false,
};

export default MenuItem;
