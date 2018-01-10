import React from 'react'

import './demo.scss'
import Button from '@component/button/button.js'
console.log(Button)
export default class App extends React.Component {
  render () {
    return (
        <React.Fragment>
        <div>看家你笑了哈哈哈给力滚蛋爬开哈哈哈</div>
        <img src={require('./image/logo.png')} alt=""/>
          <Button></Button>
        </React.Fragment>
    )
  }
}