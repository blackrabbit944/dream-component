// export type { MessageBoxProps } from './MessageBox';
// export default MessageBox;
import React from 'react';
import { createRoot } from 'react-dom/client';

import { createWrapperAndAppendToBody } from './../common/ReactPortal';
import Message from './Message';

let notification: any = null;
let message_box_instance: any = null;

interface addNoticeProps {
    type: string;
    content: string | React.ReactNode;
    during: number | null;
    onClose: () => void;
    key: string | null;
}

function createNotification() {
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
        message_box_instance = element;
    };

    const rooter = createRoot(element);
    rooter.render(<Message ref={setNotificationInstance} />);

    return {
        addNotice(notice: addNoticeProps) {
            if (!notice['key']) {
                notice['key'] = String(new Date().getTime());
            }

            if (!message_box_instance) {
                console.log('尚未初始化message_box_instance');
                setTimeout(() => {
                    notification.addNotice(notice);
                }, 200);
                return () => {
                    message_box_instance.close(notice['key']);
                };
            } else {
                console.log('notice', notice);
                return message_box_instance.open({
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
    if (!notification) {
        console.log('notification不存在');
        notification = createNotification();
    }
    // console.log('notification', notification);
    return notification.addNotice(props);
};

export default {
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
