import classNames from 'classnames';
import React from 'react';
import { ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';

import Button from './../button/Button';
import MaskBg from './../maskbg/MaskBg';

export interface ConfirmModalProps {
    onDestory?: () => void; //销毁时的回调
    width?: number; ///弹窗宽度
    position?: 'center' | 'top'; ///弹窗位置
    zIndex?: number;
    marginTop?: number;
    animation?: 'fade' | 'slideIn';
    maskBgColor?: string;
    maskCloseable?: boolean;
    cancelBtn?: React.ReactElement;
    okBtn?: React.ReactElement;
}

interface showModalProps {
    content: string;
    title?: string;
    cancel?: () => void;
    ok?: () => void;
    cancelBtn?: React.ReactElement;
    okBtn?: React.ReactElement;
}

interface ConfirmModalState extends showModalProps {
    visible: boolean;
}

class ConfirmModalClass extends React.Component<ConfirmModalProps, ConfirmModalState> {
    static defaultProps = {
        width: 400,
        position: 'center',
        zIndex: 30,
        marginTop: 0,
        animation: 'slideIn',
        maskBgColor: '#000',
        maskCloseable: false,
        cancelBtn: <Button>cancel</Button>,
        okBtn: <Button type="primary">ok</Button>
    };
    modalRef: React.RefObject<HTMLDivElement>;

    constructor(props: ConfirmModalProps) {
        super(props);
        this.closeOnEscapeKeyDown = this.closeOnEscapeKeyDown.bind(this);
        this.modalRef = React.createRef();
        this.state = {
            visible: false,
            content: '',
            title: ''
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.closeOnEscapeKeyDown = this.closeOnEscapeKeyDown.bind(this);
    }

    componentDidMount() {
        ///当按下ESC键的时候则自动关闭modal
        document.addEventListener('keydown', this.closeOnEscapeKeyDown);
    }

    componentDidUpdate(
        prevProps: Readonly<ConfirmModalProps>,
        prevState: Readonly<ConfirmModalState>,
        snapshot?: any
    ): void {
        ///当弹窗从不可见变为可见的时候,需要给body增加一个不可滚动的属性,当弹窗变为不可见的时候,需要移除这个属性
        if (prevState.visible != this.state.visible) {
            if (this.state.visible) {
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
            this.hide();
            if (this.state.cancel) {
                this.state.cancel();
            }
        }
    }

    show(props: showModalProps) {
        console.log('called show');
        this.setState({
            visible: true,
            ...props
        });
    }

    hide() {
        this.setState({
            visible: false
        });
    }

    onCancel() {
        this.hide();
        if (this.state.cancel) {
            this.state.cancel();
        }
    }

    onConfirm() {
        this.hide();
        if (this.state.ok) {
            this.state.ok();
        }
    }

    render() {
        const { onDestory } = this.props;

        const { visible, content, title, cancel, ok, okBtn, cancelBtn } = this.state;

        const { width, position, zIndex, marginTop, animation, maskBgColor, maskCloseable } =
            this.props;

        let CancelBtn: ReactElement | null = null;
        if (this.state.cancelBtn) {
            CancelBtn = this.state.cancelBtn;
        } else if (this.props.cancelBtn) {
            CancelBtn = this.props.cancelBtn;
        } else {
            CancelBtn = <Button>cancel</Button>;
        }

        let OkBtn: ReactElement | null = null;
        if (this.state.okBtn) {
            OkBtn = this.state.okBtn;
        } else if (this.props.okBtn) {
            OkBtn = this.props.okBtn;
        } else {
            OkBtn = <Button type="primary">ok</Button>;
        }

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

        return (
            <div>
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
                        style={modalWrapperStyle}
                        onClick={maskCloseable ? this.hide : undefined}
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
                            <div className="dream-modal-content">{content}</div>
                            <div className="dream-modal-footer">
                                <span className="btn-gap">
                                    {React.cloneElement(CancelBtn, { onClick: this.onCancel })}
                                </span>
                                {React.cloneElement(OkBtn, { onClick: this.onConfirm })}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}
export default ConfirmModalClass;
