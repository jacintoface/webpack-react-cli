import React from 'react'
import buttonCss from './styles.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Action from '@action/index'

interface IProps {
  actions: {
    add: (number: number) => void,
    remove: (number: number) => void
  }
}

class Button extends React.Component<IProps> {
  add = () => {
    this.props.actions.add(10)
  }

  remove = () => {
    this.props.actions.remove(10)
  }

  render () {
    return (
      <>
        <button className={buttonCss.bgc} onClick={this.add}>
          看见你哈哈2
        </button>
        <button className={buttonCss.bgc} onClick={this.remove}>
          看见你哭了
        </button>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...Action }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button)
