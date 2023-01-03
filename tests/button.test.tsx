/**
 * @jest-environment jsdom
 */
// import { act } from 'react-dom/test-utils';

// const { TestEnvironment } = require('jest-environment-jsdom');
// import { render } from '@testing-library/react';
// will use react-dom
import { render } from '@testing-library/react';

import Button from './../src/button';

describe('Button', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    // function renderDemo(config?: ButtonProps) {}

    it('button基础使用', () => {
        render(<Button>测试按钮</Button>);
        expect(document.querySelector('.dream-btn')).toBeTruthy();
    });

    it('button outline样式', () => {
        render(<Button outline={true}>测试按钮</Button>);
        expect(document.querySelector('.dream-btn.outline')).toBeTruthy();
    });

    it('button danger,primary,seconday等样式', () => {
        render(
            <div>
                <Button type={'primary'}>测试按钮</Button>
                <Button type={'secondary'}>测试按钮</Button>
                <Button type={'danger'}>测试按钮</Button>
            </div>
        );
        expect(document.querySelector('.dream-btn.type-primary')).toBeTruthy();
        expect(document.querySelector('.dream-btn.type-secondary')).toBeTruthy();
        expect(document.querySelector('.dream-btn.type-danger')).toBeTruthy();
    });

    it('button loading样式', () => {
        render(
            <div>
                <Button type={'primary'} loading={true}>
                    测试按钮
                </Button>
            </div>
        );
        expect(document.querySelector('.dream-btn .dream-btn-loading-icon')).toBeTruthy();
    });

    it('button size部分', () => {
        render(
            <div>
                <Button type={'primary'} size="xsmall" loading={true}>
                    测试按钮
                </Button>
                <Button type={'primary'} size="small" loading={true}>
                    测试按钮
                </Button>
                <Button type={'primary'} size="middle" loading={true}>
                    测试按钮
                </Button>
                <Button type={'primary'} size="large" loading={true}>
                    测试按钮
                </Button>
            </div>
        );
        expect(document.querySelector('.dream-btn.size-xsmall')).toBeTruthy();
        expect(document.querySelector('.dream-btn.size-small')).toBeTruthy();
        expect(document.querySelector('.dream-btn.size-middle')).toBeTruthy();
        expect(document.querySelector('.dream-btn.size-large')).toBeTruthy();
    });
});
