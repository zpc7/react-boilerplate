import React from 'react';
import { Layout, Menu } from "antd";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import './Routes.less';

const { Header, Sider, Content } = Layout;

export default class Routes extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Layout id='app-wrapper'>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to='/'>
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to='/test'>
                  <span>nav test</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header id='header'>
            </Header>
            <Content id='content'>
              <Switch>
                <Route exact path="/" render={() => <div>content</div>} />
                <Route key='test' path='/test' render={() => <div>content Test</div>} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
