import React from 'react';
import { createRoot } from 'react-dom/client';

import { createWrapperAndAppendToBody } from './../common/ReactPortal';
import ConfirmModal from './ConfirmModal';
import { ConfirmModalProps } from './ConfirmModal';

let confirmModalInstance: any = null;
let confirmModalRef: any = null;

export interface showConfirmModalProps {
    content: string;
    ok?: () => void;
    cancel?: () => void;
}

function createConfirmModalInstance(props: ConfirmModalProps) {
    const wrapperId = 'react-confirm-modal-container';
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
        systemCreated = true;
        element = createWrapperAndAppendToBody(wrapperId);
    }

    const setConfirmInstance = (element: any) => {
        confirmModalRef = element;
    };

    const rooter = createRoot(element);

    rooter.render(<ConfirmModal ref={setConfirmInstance} {...props} />);

    return {
        show(props: showConfirmModalProps): void {
            if (!confirmModalRef) {
                console.log('尚未初始化confirm弹窗对象');
                setTimeout(() => {
                    confirmModalInstance.show({
                        ...props
                    });
                }, 200);
            } else {
                console.log('confirmModalRef', confirmModalRef);
                confirmModalRef.show({
                    ...props
                });
            }
        },
        close(key: string) {
            console.log('called close');
            // hideModal();
            // return confirmModalRef.close(key);
        },
        destroy() {
            if (rooter) {
                rooter.unmount();
            }
        }
    };
}

export default {
    init(props: ConfirmModalProps): void {
        if (!confirmModalInstance) {
            confirmModalInstance = createConfirmModalInstance(props);
        }
    },
    show(props: showConfirmModalProps): void {
        if (!confirmModalInstance) {
            console.log('confirmModalInstance不存在');
            return;
        }
        return confirmModalInstance.show(props);
    }
};
