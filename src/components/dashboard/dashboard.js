import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

class Dashboard extends Component {
  render() {
    return (
    	<div>
					Dashboard
			</div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content };
}

export default connect(mapStateToProps)(Dashboard);
