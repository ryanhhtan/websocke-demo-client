import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activatePane } from '../../actions/chat';
import './PaneTab.css';

class PaneTab extends Component {
  activePane = () => {
    const { pane, activePane } = this.props;
    if (pane === activePane) return;
    activePane(pane);
  };

  render() {
    const { pane, activePane } = this.props;

    const active = pane === activePane ? ' active-tab' : '';

    return (
      <div
        className={'tabs' + active}
        onClick={() => this.props.activatePane(pane)}>
        <span>{this.props.pane}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activePane: state.chatReducer.activePane,
});

const mapDispatchToProps = dispatch => ({
  activatePane: pane => dispatch(activatePane(pane)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaneTab);
