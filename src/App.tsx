import './App.css';

import { useState } from 'react';

import Button, { ButtonProps } from './button/index';
import Modal, { ModalProps } from './modal/index';

const ModalExample: React.FC<ModalProps> = (props) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="App">
            <Button
                onClick={() => {
                    setVisible(true);
                }}
                type="secondary"
            >
                打开弹窗
            </Button>
            <Modal
                {...props}
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
            >
                <div>👋 Hello there!</div>
            </Modal>
        </div>
    );
};

const ButtonExample: React.FC<ButtonProps> = (props) => {
    return (
        <div className="App">
            <Button {...props}>{props.children}</Button>
        </div>
    );
};

function App() {
    const [visible, setVisible] = useState<boolean>(false);

    const handleClose = (): any => {
        console.log('调用到handleClose');
        setVisible(false);
    };

    return (
        <div className="App">
            <div className="block-component">
                <h1>弹窗</h1>

                <div className="block-1">
                    <h2>基本使用</h2>
                    <div>
                        <ModalExample
                            maskBgColor={'#000'}
                            maskOpacity={50}
                            maskCloseable={true}
                            title={'标题'}
                            footer={<div>测试代码</div>}
                        >
                            <div>👋 Hello there!</div>
                        </ModalExample>
                    </div>
                </div>

                <div className="block-1">
                    <h2>点击mask不可关闭</h2>
                    <div>
                        <ModalExample
                            maskBgColor={'#000'}
                            maskOpacity={50}
                            maskCloseable={false}
                            title={'标题'}
                        >
                            <div>👋 Hello there!</div>
                        </ModalExample>
                    </div>
                </div>

                <div className="block-1">
                    <h2>采用footer按钮控制关闭</h2>
                    <div>
                        <ModalExample
                            maskBgColor={'#f00'}
                            maskOpacity={50}
                            maskCloseable={false}
                            title={'确认操作是否正确'}
                            useFooterButtonClose={true}
                            onConfirm={() => {
                                console.log('点击了confirm');
                            }}
                            onCancel={() => {
                                console.log('点击了cancel');
                            }}
                        >
                            <div>👋 Hello there!</div>
                        </ModalExample>
                    </div>
                </div>
                <div className="block-1">
                    <h2>自定义mask颜色和宽度</h2>
                    <div>
                        <ModalExample
                            maskBgColor={'#f00'}
                            maskOpacity={50}
                            maskCloseable={true}
                            title={'这里是标题'}
                            width={900}
                        >
                            <div>👋 Hello there!</div>
                        </ModalExample>
                    </div>
                </div>
                <div className="block-1">
                    <h2>距离顶部弹出</h2>
                    <div>
                        <ModalExample
                            maskBgColor={'#000'}
                            maskOpacity={80}
                            maskCloseable={true}
                            title={'这里是标题'}
                            width={600}
                            marginTop={'100px'}
                            position={'top'}
                        >
                            <div>👋 Hello there!</div>
                        </ModalExample>
                    </div>
                </div>
                <div className="block-1">
                    <h2>渐入效果动画</h2>
                    <div>
                        <ModalExample
                            maskBgColor={'#000'}
                            maskOpacity={80}
                            maskCloseable={true}
                            title={'这里是标题'}
                            width={600}
                            marginTop={'100px'}
                            position={'top'}
                            animation={'fade'}
                        >
                            <div>👋 Hello there!</div>
                        </ModalExample>
                    </div>
                    <h2>从上到下进入</h2>
                    <div>
                        <ModalExample
                            maskBgColor={'#000'}
                            maskOpacity={80}
                            maskCloseable={true}
                            title={'这里是标题'}
                            width={600}
                            marginTop={'100px'}
                            position={'top'}
                            animation={'slideIn'}
                        >
                            <div>👋 Hello there!</div>
                        </ModalExample>
                    </div>
                </div>
            </div>

            <hr />
            <div className="block-component">
                <h1>消息通知</h1>

                <div className="block-1">
                    <h2>基本使用</h2>
                    <div className="block-center-component"></div>
                </div>
            </div>
            <hr />

            <div className="block-component">
                <h1>按钮</h1>

                <div className="block-1">
                    <h2>基本使用</h2>
                    <div className="block-center-component">
                        <ButtonExample>提交内容</ButtonExample>
                        <ButtonExample type="primary">提交内容</ButtonExample>
                        <ButtonExample type="secondary">提交内容</ButtonExample>
                        <ButtonExample type="danger">提交内容</ButtonExample>
                    </div>
                </div>

                <div className="block-1">
                    <h2>外描边</h2>
                    <div className="block-center-component">
                        <ButtonExample outline={true}>提交内容</ButtonExample>
                        <ButtonExample type="primary" outline={true}>
                            提交内容
                        </ButtonExample>
                        <ButtonExample type="secondary" outline={true}>
                            提交内容
                        </ButtonExample>
                        <ButtonExample type="danger" outline={true}>
                            提交内容
                        </ButtonExample>
                    </div>
                </div>

                <div className="block-1">
                    <h2>不可使用</h2>
                    <div className="block-center-component">
                        <ButtonExample outline={true} disabled={true}>
                            提交内容
                        </ButtonExample>
                        <ButtonExample type="primary" outline={true} disabled={true}>
                            提交内容
                        </ButtonExample>
                        <ButtonExample type="secondary" disabled={true}>
                            提交内容
                        </ButtonExample>
                        <ButtonExample type="danger" disabled={true}>
                            提交内容
                        </ButtonExample>
                    </div>
                </div>

                <div className="block-1">
                    <h2>loading</h2>
                    <div>
                        <ButtonExample loading={true}>提交内容</ButtonExample>
                    </div>
                </div>

                <div className="block-1">
                    <h2>loading</h2>
                    <div>
                        <ButtonExample loading={true}>提交内容</ButtonExample>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
