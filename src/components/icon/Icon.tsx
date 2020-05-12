import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import Classnames from 'classnames';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)

const Icon: React.FC<FontAwesomeIconProps> = (props) => {
    const {className,...restProps} = props;

    const iconClassName = Classnames('sun-icon', {
        [`${className}`]: true
    });

    return (
        <FontAwesomeIcon
            className={iconClassName}
            {...restProps}
        />
    );
};

export default Icon;
