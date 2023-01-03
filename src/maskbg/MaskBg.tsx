import './MaskBg.css';

import classNames from 'classnames';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { MaskBgAnimation } from './const';

export interface MaskBgProps extends React.HTMLAttributes<HTMLElement> {
    onClick?: (e: SyntheticEvent) => void; //点击事件
    afterClose?: () => any; //关闭以后的回调事件

    bgColor?: string; ///颜色属性,可选是所有的颜色比如#ffffff
    zIndex?: number; //弹窗的zindex属性
    visible?: boolean; //是否可见

    animation?: string; //动画名称,默认为fade
}

const MaskBg: React.FC<MaskBgProps> = (props) => {
    const {
        className = '',
        style = {},
        animation = MaskBgAnimation.fade,
        zIndex = 10,
        visible = false,
        bgColor = '#000',
        onClick,
        afterClose
    } = props;

    style['backgroundColor'] = bgColor;
    if (zIndex) {
        style['zIndex'] = zIndex;
    }

    const handleClick = (e: SyntheticEvent): any => {
        if (onClick) {
            onClick(e);
        }
    };

    const [isShowed, setIsShowed] = useState<boolean>(false);

    useEffect(() => {
        if (visible) {
            setIsShowed(true);
        }
        if (visible == false && isShowed && afterClose) {
            afterClose();
        }
    }, [visible]);

    // if (!visible) {
    //     return null;
    // }
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            in={visible}
            timeout={200}
            unmountOnExit
            classNames={'mask-fade'}
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                className={classNames('dream-mask-bg', className)}
                style={style}
                onClick={handleClick}
            ></div>
        </CSSTransition>
    );
};

export default MaskBg;
