AFRAME.registerComponent('gat', {
 
  tick: function (time, timeDelta) {
    var myElement = document.getElementById("video");
    console.log(myElement.currentTime);
  }
});
