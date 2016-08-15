import React, { Component } from 'react'

class Campaign extends Component {
  render() {
    console.log('Campaigns render', this.props.data);
    return <div>1 Campaigns container -> {this.props.data.pap.name}</div>
  }
}

export default Campaign
