// 应用入口
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './main.css';
import Routes from './routes';

moment.locale('zh-cn');

const reducer = () => {};
const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Routes />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root'),
);
