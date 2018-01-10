import React from 'react'
import buttonCss from './styles.scss'

export default class Button extends React.Component {
  render () {
    return (
        <button className={buttonCss.bgc}>
          看见你哈哈
        </button>
    )
  }
}