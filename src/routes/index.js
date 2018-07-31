import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Link } from 'react-router-dom';
import { Layout } from 'antd';

import SideBar from '../layouts/SideBar';
import Home from '../containers/home/Home';

const { Header, Content, Footer } = Layout;

const component = () => <div className="qqqqq">11111</div>;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
        <Layout style={{ height: '100%' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/test" component={component} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
              Hello! This is PC!
          </Footer>
        </Layout>
      </Layout>);
  }
}

const Routes = () => (
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>);

export default Routes;
