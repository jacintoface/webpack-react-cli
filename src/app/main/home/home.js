import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { add } from '../../actions/index'
import style from './style/home.scss'

class Home extends React.Component {
  handleClick = () => {
    this.props.add(2)
  }

  render () {
    const { count } = this.props
    return (
      <div className={style.homeContainer}>
        <div>HOme</div>
        <button onClick={this.handleClick}>点击</button>
        <div>{count}</div>
        <span className='icon-arrow_lift1'>
          <img src={require('./images/logo.png')} />
        </span>
        <div className={style.imgBox}>11</div>
      </div>
    )
  }
}

Home.propTypes = {
  count: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    count: state.event.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: count => dispatch(add(count))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
