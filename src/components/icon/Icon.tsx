import React from 'react';
import Classnames from 'classnames';

type iconSize = "small" | "default" | "large";

interface IconProps {
    type: string,
    className?: string,
    size?: iconSize;
    style?: React.CSSProperties;
}


const Icon: React.FC<IconProps> = (props) => {
    const {className, type, size, style, ...restProps} = props;

    const iconClassName = Classnames('iconfont', {
        [`${type} ${size}`]: true,
        [`${className}`]:true,
    });

    return (
        <i
            style={style}
            className={iconClassName}
            {...restProps}
        />
    );
};

Icon.defaultProps = {
    type: "",
    size: "default",
    className: ""
};

export default Icon;
