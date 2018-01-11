import React from 'react'

import './demo.scss'
import Button from '@component/button/button.js'
import {connect} from 'react-redux'
class App extends React.Component {
  render () {
    return (
        <React.Fragment>
        <div>看家你笑了哈哈哈给力滚蛋爬开哈哈哈</div>
			<div>{this.props.count}</div>
        <img src={require('./image/logo.png')} alt=""/>
          <Button></Button>
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
	return {
		count: state.event.count
	}
}

export default connect(mapStateToProps)(App)