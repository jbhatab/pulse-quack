var React = require('react');
var RoomStore = require('../stores/room_store');

var RoomList = React.createClass({
  render: function() {
    listed = this.state.listed.map(this._generateChannelLI)
    subscribed = this.state.subscribed.map(this._generateChannelLI);
    unsubscribed = this.state.unsubscribed.map(this._generateChannelLI);
    return(
      <div className="room-list">
        <h4>Channels</h4>
        <ul>
          {listed}
        </ul>
        <ul>
          {subscribed}
        </ul>
        --
        <ul>
          {unsubscribed}
        </ul>
      </div>
    );
  },

  getInitialState: function() {
    return {
      listed: RoomStore.listed(),
      subscribed: RoomStore.subscribed(),
      unsubscribed: RoomStore.unsubscribed()
    };
  },

  componentDidMount: function() {
    RoomStore.on('change', this._roomStoreChange);
  },

  componentWillUnmount: function() {
    RoomStore.removeListener('change', this._roomStoreChange);
  },

  _generateChannelLI: function(room) {
    return(
      <li key={room} onClick={this._onClick} className={this.props.active == room ? 'active' : ''}>{room}</li>
    );
  },

  _onClick: function(event) {
    event.preventDefault();
    roomName = event.target.textContent;
    this.props.activeRoomChangeCallback(roomName);
  },

  _roomStoreChange: function() {
    this.setState({
      subscribed: RoomStore.subscribed(),
      unsubscribed: RoomStore.unsubscribed()
    });
  }
});
module.exports = RoomList;
