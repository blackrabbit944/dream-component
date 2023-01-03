import './Button.css';

import classNames from 'classnames';
import React from 'react';

export interface ButtonProps extends React.HTMLAttributes<any> {
    loading?: boolean;
    children?: React.ReactNode | string;
    type?: 'primary' | 'secondary' | 'default' | 'danger' | 'link' | 'text';
    size?: 'large' | 'middle' | 'small' | 'xsmall';
    outline?: boolean;
    disabled?: boolean;
    rounded?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

const LoadingSvg: React.FC<{ className: string }> = (props) => {
    return (
        <svg
            className={classNames('animate-spin', 'dream-btn-icon', props.className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className={'opacity-25'}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className={'opacity-75'}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

const ButtonClass: React.FC<ButtonProps> = (props) => {
    const {
        loading = false,
        type = 'default',
        size = 'middle',
        disabled = false,
        outline = false,
        rounded = false,
        ...restProps
    } = props;

    return (
        <button
            className={classNames(
                'dream-btn',
                'type-' + type,
                'size-' + size,
                {
                    'dream-btn-outline': outline
                },
                {
                    rounded: rounded
                },
                { disabled: disabled },
                { loading: loading }
            )}
            {...restProps}
        >
            {loading ? <LoadingSvg className="dream-btn-loading-icon" /> : null}
            {props.children}
        </button>
    );
};

export default ButtonClass;
