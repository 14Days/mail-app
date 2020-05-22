import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import UserInfo from '../components/user';

class Admin extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'admin/handleInit',
    });
  }
  render() {
    const {userList} = this.props;
    return userList.length === 0 ? null : (
      <>
        {userList.map((u, index) => (
          <UserInfo userData={u} key={index} index={index} />
        ))}
      </>
    );
  }
}

export default connect((state) => state.admin)(Admin);
