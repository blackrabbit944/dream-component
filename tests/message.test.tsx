/**
 * @jest-environment jsdom
 */
// import { act } from 'react-dom/test-utils';
import { act } from '@testing-library/react-hooks/dom'; // will use react-dom

import Message from '../src/message';
import { MessageBoxProps } from '../src/message/MessageBox';
// const { TestEnvironment } = require('jest-environment-jsdom');

describe('Message', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    function renderDemo(config?: MessageBoxProps) {}

    it('测试基础messagebox', () => {
        act(() => {
            Message.success('test');
        });
        expect(document.querySelector('.dream-message-box-wrapper')).toBeTruthy();
    });
});
