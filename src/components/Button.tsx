import React, { MouseEventHandler, ReactElement } from 'react';
import { Button as AButton, Tooltip } from 'antd';
import { ButtonType } from 'antd/lib/button';

export interface IButtonOptions {
    tooltipTitle?: string;
    buttonTitle: string;
    icon?: ReactElement<any, any>;
    type?: ButtonType;
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick?: MouseEventHandler<HTMLElement>;
}

function Button({
    tooltipTitle,
    buttonTitle,
    icon,
    isLoading = false,
    isDisabled = false,
    type = 'primary',
    onClick = () => {},
}: IButtonOptions) {
    return (
        <Tooltip title={tooltipTitle}>
            <AButton
                data-testid="bsui-button"
                type={type}
                loading={isLoading}
                icon={icon}
                disabled={isDisabled}
                onClick={onClick}
            >
                {buttonTitle}
            </AButton>
        </Tooltip>
    );
}

export default Button;
