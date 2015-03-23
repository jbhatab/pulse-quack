var React = require('react');
var Quack = require('./components/quack.jsx');
var styleNode = require('../stylesheets/app.scss');

// bootstrap entire application and render into DOM
React.render(
  <Quack />,
  document.getElementById('react')
);
