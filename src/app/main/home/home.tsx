import React from 'react';
import { connect } from 'react-redux';
import { add } from '../../actions/index';
import { Button } from 'antd';

class Home extends React.Component<any, any> {
  handleClick = () => {
    this.props.add(2);
  }

  render () {
    const { count } = this.props;
    return (
      <div>
        <Button type='primary'>看见你笑了</Button>
        <div>HOme</div>
        <button onClick={this.handleClick}>点击</button>
        <div>{count}</div>
        <span className='icon-arrow_lift1'>
          <img src={require('./images/logo.png')} />
        </span>
        <div>11</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.event.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: count => dispatch(add(count))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
