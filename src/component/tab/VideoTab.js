import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VideoTab.css';

class VideoTab extends Component {
  constructor(props) {
    super(props);
    this.localVideo = React.createRef();
  }

  componentDidMount() {
    this.localVideo.current.srcObject = this.props.localMedia;
  }

  render() {
    // const { localMedia } = this.state;
    return (
      <div className="tab-pane">
        <div>
          <div className="remote-video">
            <video autoPlay />
          </div>
          <div className="local-video">
            <video ref={this.localVideo} autoPlay />
            <button onClick={this.endCall}>End call</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  localMedia: state.chatReducer.localMedia,
});

export default connect(mapStateToProps)(VideoTab);
