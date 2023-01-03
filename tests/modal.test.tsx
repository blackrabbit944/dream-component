/**
 * @jest-environment jsdom
 */
// import { act } from 'react-dom/test-utils';
// import { act } from '@testing-library/react-hooks/dom'; // will use react-dom
import { render } from '@testing-library/react';

import Modal from '../src/modal';
// import { MessageBoxProps } from '../src/message/MessageBox';
// const { TestEnvironment } = require('jest-environment-jsdom');

describe('Modal', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('modal基础使用', () => {
        render(<Modal visible={true}>这里是内容数据</Modal>);
        expect(document.querySelector('.dream-modal-wrapper')).toBeTruthy();
    });

    it('modal关闭', () => {
        render(<Modal visible={false}>这里是内容数据</Modal>);
        expect(document.querySelector('.dream-modal-wrapper')).toBeNull();
    });
});
