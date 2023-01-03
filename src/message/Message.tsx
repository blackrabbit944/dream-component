import './Message.css';

import React from 'react';

import type { MessageBoxProps } from './MessageBox';
import MessageBox from './MessageBox';
import type { MessageOneProps } from './MessageOne';
import MessageOne from './MessageOne';

export interface MessageRef {
    open: (config: MessageOneProps) => any;
    close: (key: React.Key) => void;
    destroy: () => void;
}

const Message = React.forwardRef<MessageRef, MessageBoxProps>((props, ref) => {
    const { maxCount = 5 } = props;
    const [messageList, setMessageList] = React.useState<MessageOneProps[]>([]);

    // ======================== Close =========================
    const onMessageClose = (key: React.Key) => {
        // Trigger close event
        // const config = messageList.find((item) => item.key === key);
        // config?.onClose?.();

        setMessageList((list) => list.filter((item) => item.key !== key));
    };

    // ========================= Refs =========================
    React.useImperativeHandle(ref, () => ({
        open: (config) => {
            const key = String(new Date().getTime());
            if (!config['key']) {
                config['key'] = key;
                config['messageKey'] = key;
            }

            console.log('debug-config', config);
            // config['onClose'] = () => {
            //     onMessageClose(config['key']);
            // };

            setMessageList((list) => {
                let clone = [...list];

                // Replace if exist
                const index = clone.findIndex((item) => item.key === config.key);
                if (index >= 0) {
                    clone[index] = config;
                } else {
                    clone.push(config);
                }

                if (maxCount && maxCount > 0 && clone.length > maxCount) {
                    clone = clone.slice(-maxCount);
                }

                return clone;
            });

            if (config['type'] == 'loading') {
                return () => {
                    onMessageClose(key);
                };
            } else {
                return null;
            }
        },
        close: (key): void => {
            onMessageClose(key);
        },
        destroy: (): void => {
            setMessageList([]);
        }
    }));

    return (
        <MessageBox>
            {messageList.map((item, index) => {
                return (
                    <MessageOne
                        {...item}
                        key={item.key}
                        messageKey={item.key}
                        onMessageClose={onMessageClose}
                    />
                );
            })}
        </MessageBox>
    );
});
Message.displayName = 'Message';
export default Message;
