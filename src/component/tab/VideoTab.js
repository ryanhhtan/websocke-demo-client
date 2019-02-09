import React, { Component } from 'react';
import './VideoTab.css';

class VideoTab extends Component {
  render() {
    return (
      <div className="tab-pane">
        <div>
          <div className="remote-video">
            <video autoPlay />
          </div>
          <div className="local-video">
            <video autoPlay />
          </div>
        </div>
      </div>
    );
  }
}

export default VideoTab;
