import './Modal.css';

import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { SyntheticEvent } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from '../button/Button';
import MaskBg from '../maskbg/MaskBg';

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

interface ModalState {
    is_set_el: boolean;
}

class ModalClass extends React.Component<ModalProps, ModalState> {
    static defaultProps = {
        maskOpacity: 80,
        maskBgColor: '#000',
        maskCloseable: true,
        zIndex: 20,
        visible: false,
        position: 'center',
        marginTop: '0px',
        width: 500,
        animation: 'slideIn',
        cancelText: 'cancel',
        confirmText: 'confirm'
    };
    modalRef: React.RefObject<HTMLDivElement>;
    el: HTMLDivElement | null = null;

    constructor(props: ModalProps) {
        super(props);

        const is_set_el = typeof document == 'undefined' ? false : true;

        this.state = {
            is_set_el: is_set_el
        };

        this.el = typeof document == 'undefined' ? null : document.createElement('div');
        this.closeOnEscapeKeyDown = this.closeOnEscapeKeyDown.bind(this);
        this.modalRef = React.createRef();
        this.getModalParentNode = this.getModalParentNode.bind(this);
    }

    componentDidMount() {
        ///当按下ESC键的时候则自动关闭modal
        document.addEventListener('keydown', this.closeOnEscapeKeyDown);

        //把el插入到modal的父组件中
        if (!this.state.is_set_el || !this.el) {
            this.el = document.createElement('div');
        }

        this.getModalParentNode().appendChild(this.el);
        this.setState({
            is_set_el: true
        });
    }

    componentDidUpdate(
        prevProps: Readonly<ModalProps>,
        prevState: Readonly<ModalState>,
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

        //把el移除从modal的父组件中
        if (this.el) {
            this.getModalParentNode().removeChild(this.el);
        }
    }

    getModalParentNode(wrapperId = 'react-portal-modal-container'): HTMLElement {
        let element = document.getElementById(wrapperId);
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
            element = this.createModalParentNode(wrapperId);
        } else {
            console.log('modal-in:element存在因此不会自动创建', element, wrapperId);
        }
        return element;
    }

    createModalParentNode(wrapperId: string): HTMLElement {
        console.log('modal-in:createModalParentNode', wrapperId);
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('id', wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    }

    closeOnEscapeKeyDown(e: KeyboardEvent) {
        if (this.props.visible == false) return;
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
            width,
            animation,
            useFooterButtonClose,
            cancelText,
            confirmText,
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
        const modalWrapperStyle: React.CSSProperties = {};
        if (zIndex && zIndex > 0) {
            modalWrapperStyle['zIndex'] = zIndex;
        }

        let animation_class = 'modal-slide-in';
        if (animation == 'fade') {
            animation_class = 'modal-fade';
        } else if (animation == 'slideIn') {
            animation_class = 'modal-slide-in';
        }

        if (!this.state.is_set_el) {
            console.log('debug:modal:因为this.el不存在所以不会渲染');
            return null;
        }

        return ReactDOM.createPortal(
            <div className="mask">
                <MaskBg
                    visible={visible}
                    bgColor={maskBgColor}
                    zIndex={zIndex ? zIndex - 1 : 10}
                    animation={animation}
                />

                <CSSTransition
                    in={visible}
                    timeout={300}
                    unmountOnExit
                    classNames={animation_class}
                    nodeRef={this.modalRef}
                    onEnter={() => console.log('modal-enter')}
                    onExited={() => console.log('modal-exit')}
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
                        style={modalWrapperStyle}
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
            </div>,
            this.el ? this.el : document.createElement('div')
        );
    }
}

export default ModalClass;
