import React from 'react'
import { hot } from 'react-hot-loader/root'
import './demo.scss'
import Rout from './routes/route'

class App extends React.Component {
  render () {
    return (
		<Rout/>
    )
  }
}

export default hot(App)


