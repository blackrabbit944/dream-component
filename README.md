# Dream-Component

提供基础的React组件库,目前包括按钮,弹窗,消息提示三个部分,未来可能会增加不同内容

## 开发的目标
只封装必要的组件库,以降低安装依赖,降低完成项目后项目作品大小
在长期React开发过程中,我发现弹窗,消息提示,按钮这三个部分几乎是每个项目都会用到的组件库,但是如果为了这三个部分引入AntDesign类似库就显得不划算,因此长期依赖我的方法是利用一些组件库来自己封装
在开发过程中萌生出了想自己封装这些基础组件库的想法,因此有了Dream Component这个库.

## Demo

访问示例代码:https://63b3adf7f2b7c919c72b42a3-dtqhwzylfr.chromatic.com/

## 安装

```
yarn install dream-component
```
或
```
npm install dream-component --save
```

## 如何使用

### Button
```
import Button from 'dream-component/button'

export interface ButtonProps extends React.HTMLAttributes<any> {
    loading?: boolean;
    children?: React.ReactNode | string;
    type?: 'primary' | 'secondary' | 'default' | 'danger' | 'link' | 'text';
    size?: 'large' | 'middle' | 'small' | 'xsmall';
    outline?: boolean;
    disabled?: boolean;
    rounded?: boolean;
    onClick?: (e: React.MouseEvent) => void;
```

### Message
```

import Message from 'dream-component/message'

//完整使用
Message.success('成功提示',4500,()=>{
    console.log('关闭回调');
})

//基础使用
Message.success('成功提示')
Message.error('失败提示')
Message.warning('警提内容')
Message.info('基础内容')

//loading方法
let close = Message.loading('载入中...');
//完成以后调用可以关闭提示
close();


```

### Moda
```
import Modal from 'dream-component/modal'

export interface ModalProps {
    onClose?: () => void; //关闭弹窗
    afterClose?: () => any; //关闭以后的回调事件

    maskOpacity?: number; ///透明度可选是0-100
    maskBgColor?: string; ///颜色属性,可选是所有的颜色比如#ffffff
    maskCloseable?: boolean; //是否允许点击mask关闭

    zIndex?: number; //弹窗的zindex属性
    visible?: boolean; //是否可见

    position?: string; //弹窗位置,可选是center,top
    marginTop?: string; //弹窗位置为Top时候,这个值代表距离顶部的距离

    width?: number; //弹窗的宽度

    animation?: string; //动画名称,默认为fade

    children: React.ReactNode;
    title?: string | React.ReactNode;
    footer?: string | React.ReactNode;

    useFooterButtonClose?: boolean; //采用footer的按钮来控制关闭而不是右上角的关闭按钮
    cancelText?: string; //取消按钮的文字
    confirmText?: string; //确认按钮文字
    onCancel?: () => void; //取消按钮的回调
    onConfirm?: () => void; //确认按钮的回调
}
```
