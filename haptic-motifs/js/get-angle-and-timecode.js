AFRAME.registerComponent('get-angle-and-timecode', {
  schema: {
    enabled: {default: true},
    dx: {default: 2.0},
    dy: {default: 2.0},
  },
  init: function () {
    console.log('Heyo!');
  }
});
