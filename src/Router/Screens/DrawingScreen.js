import React, {Component} from 'react';

import SizeDraw from '../../Components/SizeDraw';

export default class AddScreen extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <SizeDraw navigation={this.props.navigation} />;
  }
}
