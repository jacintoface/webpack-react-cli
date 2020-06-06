import React from 'react'
import {
  Redirect
} from 'react-router-dom'
import Home from '../main/home/home'
import Rank from '../main/rank/rank'
import Profile from '../main/profile/profile'
import Search from '../main/search/search'
import { RouteConfig } from 'react-router-config'

type RouterType = {
  routes: RouteConfig[]
}

const routes: RouterType = {
  routes: [{
    path: '/',
    render: () => <Redirect to='/home' />,
    exact: true
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/rank',
    component: Rank
  }, {
    path: '/profile',
    component: Profile
  }, {
    path: '/search',
    component: Search
  }]
}

export default routes
