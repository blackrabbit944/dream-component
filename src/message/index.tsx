import React from 'react';
import ReactDOM from 'react-dom/client';

import { createWrapperAndAppendToBody } from './../common/ReactPortal';
import Message from './Message';
import type { MessageBoxProps } from './MessageBox';

let notificationInstance: any = null;
let messageBoxRef: any = null;

interface addNoticeProps {
    type: string;
    content: string | React.ReactNode;
    during: number | null;
    onClose: () => void;
    key: string | null;
}

function createNotification(props: MessageBoxProps = {}) {
    const wrapperId = 'react-portal-message-container';
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
        systemCreated = true;
        element = createWrapperAndAppendToBody(wrapperId);
    }

    const setNotificationInstance = (element: any) => {
        messageBoxRef = element;
    };

    const rooter = ReactDOM.createRoot(element);
    rooter.render(<Message ref={setNotificationInstance} {...props} />);

    return {
        addNotice(notice: addNoticeProps) {
            if (!notice['key']) {
                notice['key'] = String(new Date().getTime());
            }

            if (!messageBoxRef) {
                console.log('尚未初始化message_box_instance');
                setTimeout(() => {
                    notificationInstance.addNotice(notice);
                }, 200);
                return () => {
                    console.log('debug:messageBoxRef', messageBoxRef);
                    messageBoxRef.close(notice['key']);
                };
            } else {
                console.log('debug:messageBoxRef2', messageBoxRef);
                return messageBoxRef.open({
                    ...notice
                });
            }
        },
        destroy() {
            if (rooter) {
                rooter.unmount();
            }
        }
    };
}

interface noticeProps {
    type: 'success' | 'error' | 'info' | 'warning' | 'loading';
    content: string;
    during?: number;
    onClose?: () => void;
}

const notice = (props: noticeProps) => {
    if (!notificationInstance) {
        console.log('notification不存在');
        notificationInstance = createNotification({});
    }
    return notificationInstance.addNotice(props);
};

export default {
    init(props: MessageBoxProps): void {
        if (!notificationInstance) {
            notificationInstance = createNotification(props);
        }
        return notificationInstance;
    },
    info(content: string, during?: number, onClose?: any): void {
        return notice({
            type: 'info',
            content: content,
            during: during,
            onClose: onClose
        });
    },
    success(content: string, during?: number, onClose?: any): void {
        return notice({
            type: 'success',
            content: content,
            during: during,
            onClose: onClose
        });
    },
    error(content: string, during?: number, onClose?: any): void {
        console.log('content', content, {
            type: 'error',
            content: content,
            during: during,
            onClose: onClose
        });
        return notice({
            type: 'error',
            content: content,
            during: during,
            onClose: onClose
        });
    },
    loading(content: string, onClose?: any): any {
        return notice({
            type: 'loading',
            content: content,
            during: 0,
            onClose: onClose
        });
    },
    warning(content: string, during?: number, onClose?: any): void {
        return notice({
            type: 'warning',
            content: content,
            during: during,
            onClose: onClose
        });
    }
};
