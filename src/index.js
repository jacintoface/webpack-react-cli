import App from './app/app'
import React from 'react'
import ReactDOM from 'react-dom'
import configStore from './app/store/store'
import {Provider} from 'react-redux'


const store = configStore()
const render = (App) => {
    ReactDOM.render(
        <Provider store={store}>
            <App></App>
        </Provider>,
      document.getElementById('root')
  )
}

render(App)
