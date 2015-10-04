var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/app_dispatcher');

var dispatch = function(type, data) {
  AppDispatcher.dispatch({
    type: type,
    data: data
  });
};

var DispatchHandler = {};
DispatchHandler[ActionTypes.FETCH_ROOMS] = function() {
  room.chan.push('load', message);
};

var RoomListing  = function(phoenixChan) {
  this.chan = phoenixChan;
  this.chan.params.user = UserStore.localUser();
  this.chan.join()
      .receive('ignore', function() { console.log('auth error'); })
      .receive('error', function(e) { console.log('errr', e);})
      .receive('ok', function(roomUsers) {
      }.bind(this));

  this.dispatchToken = AppDispatcher.register(function(action) {
    if (DispatchHandler.hasOwnProperty(action.type)) {
      DispatchHandler[action.type](action.data, this);
    }
  }.bind(this));

  this.chan.onError(function(e) {
     console.log('something went wrong', e);
  });

  this.chan.onClose(function(e) {
    console.log('channel closed', e);
  });

  this.chan.on('load', function() {
    dispatch(ActionTypes.ROOMS_LOADED);
  }.bind(this));
};

module.exports = RoomListing;
