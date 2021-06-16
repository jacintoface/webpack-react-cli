import React from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';

interface IProps {
  routes: RouteConfig[] | undefined
}

export default class App extends React.Component<IProps> {
  render () {
    return (
      <>
        <NavLink to='/home'>首页33444 8822112221</NavLink>
        <NavLink to='/search'>搜索</NavLink>
        <NavLink to='/rank'>排行</NavLink>
        <NavLink to='/profile'>我的12355</NavLink>
        {renderRoutes(this.props.routes)}
      </>);
  }
}
