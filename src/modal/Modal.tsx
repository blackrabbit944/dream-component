import './Modal.css';

import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { SyntheticEvent } from 'react';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import MaskBg from 'src/maskbg/MaskBg';

import Button from './../button/Button';
import ReactPortal from './../common/ReactPortal';

export interface ModalProps {
    onClose?: () => void; //关闭弹窗
    afterClose?: () => any; //关闭以后的回调事件

    maskOpacity?: number; ///透明度可选是0-100
    maskBgColor?: string; ///颜色属性,可选是所有的颜色比如#ffffff
    maskCloseable?: boolean; //是否允许点击mask关闭

    zIndex?: number; //弹窗的zindex属性
    visible?: boolean; //是否可见

    position?: string; //弹窗位置,可选是center,top
    marginTop?: string; //弹窗位置为Top时候,这个值代表距离顶部的距离

    width?: number; //弹窗的宽度

    animation?: string; //动画名称,默认为fade

    children: React.ReactNode;
    title?: string | React.ReactNode;
    footer?: string | React.ReactNode;

    useFooterButtonClose?: boolean; //采用footer的按钮来控制关闭而不是右上角的关闭按钮
    cancelText?: string; //取消按钮的文字
    confirmText?: string; //确认按钮文字
    onCancel?: () => void; //取消按钮的回调
    onConfirm?: () => void; //确认按钮的回调
}

class ModalClass extends React.Component<ModalProps> {
    static defaultProps = {
        maskOpacity: 80,
        maskBgColor: '#000',
        maskCloseable: true,
        zIndex: 10,
        visible: false,
        position: 'center',
        marginTop: '0px',
        width: 500,
        animation: 'slideIn'
    };
    modalRef: React.RefObject<HTMLDivElement>;

    constructor(props: ModalProps) {
        super(props);
        this.closeOnEscapeKeyDown = this.closeOnEscapeKeyDown.bind(this);
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        ///当按下ESC键的时候则自动关闭modal
        document.addEventListener('keydown', this.closeOnEscapeKeyDown);
    }

    componentDidUpdate(
        prevProps: Readonly<ModalProps>,
        prevState: Readonly<ModalProps>,
        snapshot?: any
    ): void {
        ///当弹窗从不可见变为可见的时候,需要给body增加一个不可滚动的属性,当弹窗变为不可见的时候,需要移除这个属性
        if (prevProps.visible != this.props.visible) {
            if (this.props.visible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    componentWillUnmount(): void {
        //移除keydown的监听
        document.removeEventListener('keydown', this.closeOnEscapeKeyDown);
    }

    closeOnEscapeKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            this.props.onClose && this.props.onClose();
        }
    }

    handleClose = (e: SyntheticEvent): any => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    render() {
        const {
            children,
            title,
            footer,
            maskOpacity,
            maskBgColor,
            maskCloseable,
            zIndex,
            visible,
            position,
            marginTop,
            width = 450,
            animation,
            useFooterButtonClose = false,
            cancelText = '取消',
            confirmText = '确定',
            onCancel,
            onConfirm
        } = this.props;

        const modalStyle: React.CSSProperties = {
            width: `${width}px`
        };

        if (position == 'top') {
            if (marginTop) {
                modalStyle['marginTop'] = marginTop;
            } else {
                modalStyle['marginTop'] = '100px';
            }
        }

        let animation_class = 'modal-slide-in';
        if (animation == 'fade') {
            animation_class = 'modal-fade';
        } else if (animation == 'slideIn') {
            animation_class = 'modal-slide-in';
        }
        // if (!visible) {
        //     return null;
        // }

        return (
            <ReactPortal wrapperId="react-portal-modal-container">
                <div>
                    <MaskBg
                        visible={visible}
                        opacity={maskOpacity}
                        bgColor={maskBgColor}
                        zIndex={zIndex}
                        animation={animation}
                    />

                    <CSSTransition
                        in={visible}
                        timeout={300}
                        unmountOnExit
                        classNames={animation_class}
                        nodeRef={this.modalRef}
                        onEnter={() => console.log('fuck-enter')}
                        onExited={() => console.log('fuck-exit')}
                    >
                        <div
                            ref={this.modalRef}
                            className={classNames(
                                'dream-modal-wrapper',
                                {
                                    center: position == 'center'
                                },
                                {
                                    top: position == 'top'
                                }
                            )}
                            onClick={maskCloseable ? this.handleClose : undefined}
                        >
                            <div
                                ref={this.modalRef}
                                className={'dream-modal-box'}
                                style={modalStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {title ? <div className="dream-modal-title">{title}</div> : null}
                                <div className="dream-modal-content">{children}</div>
                                {footer && <div className="dream-modal-footer">{footer}</div>}
                                {useFooterButtonClose && (
                                    <div className="dream-modal-footer">
                                        <span className="btn-gap">
                                            <Button
                                                onClick={(e) => {
                                                    this.handleClose(e);
                                                    if (onCancel) {
                                                        onCancel();
                                                    }
                                                }}
                                            >
                                                {cancelText}
                                            </Button>
                                        </span>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                if (onConfirm) {
                                                    onConfirm();
                                                }
                                            }}
                                        >
                                            {confirmText}
                                        </Button>
                                    </div>
                                )}
                                {!useFooterButtonClose ? (
                                    <div className="dream-modal-close-btn">
                                        <XMarkIcon
                                            className="dream-modal-close-icon"
                                            onClick={this.handleClose}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </ReactPortal>
        );
    }
}
export default ModalClass;
