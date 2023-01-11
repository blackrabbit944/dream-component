import classNames from 'classnames';
import React from 'react';

export interface MessageBoxProps {
    zIndex?: number; //弹窗的zindex属性
    position?: 'topCenter' | 'topRight' | 'topLeft'; //弹窗位置,默认是topCenter
    marginTop?: string | number; //弹窗位置为Top时候,这个值代表距离顶部的距离,默认为24像素

    maxWidth?: string | number; //弹窗的最大宽度,超过这个宽度会折行,默认为450像素
    maxCount?: number; //最多展示多少条数据,超过则之前的会自动移除掉,默认为5条

    animation?: string; //动画不可选,暂时只有一种动画,默认为fade
    children?: React.ReactNode;
}

class MessageBox extends React.Component<MessageBoxProps> {
    static defaultProps = {
        zIndex: 50,
        position: 'topCenter',
        marginTop: '24px',
        maxWidth: 450
    };
    messageBoxRef: React.RefObject<HTMLDivElement>;

    constructor(props: MessageBoxProps) {
        super(props);
        this.messageBoxRef = React.createRef();
    }

    render() {
        const { zIndex, position, marginTop, maxWidth } = this.props;

        const messageBoxStyle: React.CSSProperties = {
            width: `${maxWidth}px`,
            maxWidth: '100%'
        };

        console.log('marginTop', marginTop);
        if (marginTop) {
            messageBoxStyle['paddingTop'] = marginTop;
        }

        if (zIndex) {
            messageBoxStyle['zIndex'] = zIndex;
        }
        console.log('messageBoxStyle', messageBoxStyle);

        return (
            <div
                ref={this.messageBoxRef}
                className={classNames(
                    'dream-message-box-wrapper',
                    {
                        'top-center': position == 'topCenter'
                    },
                    {
                        'top-right': position == 'topRight'
                    },
                    {
                        'top-left': position == 'topLeft'
                    }
                )}
                style={messageBoxStyle}
            >
                {this.props.children}
            </div>
        );
    }
}
export default MessageBox;
