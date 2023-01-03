import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon
} from '@heroicons/react/20/solid';
import classNames from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

export interface MessageOneProps {
    key?: React.Key;
    messageKey?: React.Key;
    closeable?: boolean; //是否展示关闭按钮,默认不可关闭
    during?: number; //展示时间默认为4500毫秒
    content: string | React.ReactNode; //内容
    onMessageClose?: (key: React.Key) => void; //关闭回调
    type: 'success' | 'error' | 'info' | 'warning' | 'loading'; //类型
}

const LoadingSvg: React.FC<{ className: string }> = (props) => {
    return (
        <svg
            className={classNames('animate-spin', props.className)}
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

class MessageOne extends React.Component<
    MessageOneProps,
    {
        visible: boolean;
    }
> {
    static defaultProps = {
        closeable: false,
        during: 4500,
        type: 'info'
    };

    messageRef: React.RefObject<HTMLDivElement>;

    constructor(props: MessageOneProps) {
        super(props);
        this.state = {
            visible: true
        };
        this.messageRef = React.createRef();
        this.close = this.close.bind(this);
    }

    componentDidMount(): void {
        const { during, type } = this.props;
        if (during && type != 'loading') {
            setTimeout(() => {
                this.close();
            }, during);
        }
    }

    close(): void {
        // const { onMessageClose, messageKey } = this.props;

        this.setState({
            visible: false
        });
        // if (onMessageClose) {
        // onMessageClose(messageKey);
        // }
    }

    _close() {
        const { onMessageClose, messageKey } = this.props;
        if (onMessageClose && messageKey) {
            onMessageClose(messageKey);
        }
    }

    render() {
        const { closeable, content, type } = this.props;
        const { visible } = this.state;
        const icon = {
            success: <CheckCircleIcon />,
            error: <XCircleIcon />,
            info: <InformationCircleIcon />,
            warning: <ExclamationCircleIcon />,
            loading: <LoadingSvg className="dream-btn-loading-icon" />
        };

        console.log('visible', visible);
        return (
            <CSSTransition
                in={visible ? true : false}
                timeout={200}
                unmountOnExit
                appear
                classNames={'msg-animation'}
                nodeRef={this.messageRef}
                onEnter={() => {
                    console.log('fuck-enter2');
                }}
                onExited={() => {
                    this._close();
                }}
            >
                <div
                    className={classNames('dream-message-one', `dream-message-one-${type}`)}
                    ref={this.messageRef}
                >
                    <div className="dream-message-one-icon">{icon[type]}</div>
                    <div className="dream-message-one-content">
                        {content}
                        {closeable ? (
                            <a className="dream-message-one-close" onClick={() => this.close()}>
                                <XMarkIcon />
                            </a>
                        ) : null}
                    </div>
                </div>
            </CSSTransition>
        );
    }
}
export default MessageOne;
