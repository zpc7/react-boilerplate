import React from 'react';
import { Layout, Menu, Icon } from "antd";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Business from '../Pages/business/Business';

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
                  <Icon type="user" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to='/test'>
                  <Icon type="upload" />
                  <span>nav test</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header id='header'>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content id='content'>
              <Switch>
                <Route key='test' path='/test' render={() => <div>content</div>} />
                <Route exact path="/" component={Business} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
