import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

export default class App extends React.Component {
  render () {
    return (
      <>
        <NavLink to='/home'>首页</NavLink>
        <NavLink to='/search'>搜索</NavLink>
        <NavLink to='/rank'>排行</NavLink>
        <NavLink to='/profile'>我的12355</NavLink>
        {renderRoutes(this.props.routes)}
      </>)
  }
}

App.propTypes = {
  routes: PropTypes.array
}
