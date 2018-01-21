import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch,
	Redirect
} from 'react-router-dom'
import Home from '../main/home/home'
import Rank from '../main/rank/rank'
import Profile from '../main/profile/profile'
import Search from '../main/search/search'

export default class Routes extends React.Component{
	constructor(props) {
		super(props)
		this.state = {}
	}
	render () {
		return (
			<Router>
				<div>
					<NavLink to="/home">首页</NavLink>
					<NavLink to="/search">搜索</NavLink>
					<NavLink to="/rank">排行</NavLink>
					<NavLink to="/profile">我的</NavLink>
					<Switch>
						<Route path="/" exact render={()=><Redirect to="/home"/>}/>
						<Route path='/home' component={Home}/>
						<Route path='/rank' component={Rank}/>
						<Route path='/profile' component={Profile}/>
						<Route path='/search' component={Search}/>
					</Switch>
				</div>
			</Router>
		)
	}
}