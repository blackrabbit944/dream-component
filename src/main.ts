import type { ButtonProps } from './button';
import Button from './button';
import type { showConfirmModalProps } from './confirm';
import ConfirmModal from './confirm';
import type { ConfirmModalProps } from './confirm/ConfirmModal';
import Message from './message';
import type { ModalProps } from './modal';
import Modal from './modal';

const components = {
    Message,
    Button,
    Modal,
    ConfirmModal
};

export default components;
export type { ButtonProps, ConfirmModalProps, ModalProps, showConfirmModalProps };
