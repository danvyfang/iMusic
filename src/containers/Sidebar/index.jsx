import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Input, Icon } from 'antd'
import { search } from 'src/actions'
import User from '../User'
import './index.less'

class Sidebar extends Component {
  state = {
    activeMenu: 'musicCenter'
  }

  componentDidMount () {
    const { location } = this.props
    const pathName = location.pathname.slice(1)
    pathName && this.setState({
      activeMenu: pathName
    })
  }

  onSearch = text => {
    const keywords = text.trim()
    if (!keywords) return
    const { location, history, dispatch } = this.props
    dispatch(search(keywords, 15, 0))
    // 跳转到搜索结果页
    const newPath = '/searchlist'
    if (location.pathname !== newPath) history.push(newPath)
  }

  menuItemClick = ({ e, key, keyPath }) => {
    const { location, history } = this.props
    const newPath = `/${key}`
    if (location.pathname !== newPath) {
      history.push(newPath)
      this.setState({
        activeMenu: key
      })
    }
  }

  render () {
    return <div className="app-sidebar">
      <User />
      <div className="search">
        <Input.Search
          placeholder="搜索"
          onSearch={this.onSearch} />
      </div>
      <Menu mode="inline" selectedKeys={[this.state.activeMenu]} onClick={this.menuItemClick}>
        <Menu.Item key="musicCenter"><Icon type="mail" />音乐馆</Menu.Item>
        <Menu.Item key="playlist"><Icon type="customer-service" />播放列表</Menu.Item>
      </Menu>
    </div>
  }
}

export default withRouter(connect()(Sidebar))
