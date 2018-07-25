import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './SideBar.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

// 侧边栏
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false // 展开/收起状态
    };
  }
  // 展开-收起时的回调函数
  onCollapse = collapsed => {
    this.setState({ collapsed });
  }
  // 选中
  handleSelect = ({ item, key, selectedKeys }) => {

  };
  render() {
    const { collapsed } = this.state;
    return (
      <Sider collapsible className="SIDEBAR" collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['home']}
          onSelect={this.handleSelect}
        >
          <Menu.Item key="home">
            <Link to="/home">
              <Icon type="home" /><span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>菜单项2</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>菜单项目3</span></span>}
          >
            <Menu.Item key="3">子项目1</Menu.Item>
            <Menu.Item key="4">子项目2</Menu.Item>
            <Menu.Item key="5">子项目3</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>菜单项目4</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
