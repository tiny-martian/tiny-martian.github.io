AFRAME.registerComponent('arrow-key-rotation', {
  schema: {
    enabled: {default: true},
    dx: {default: 2.0},
    dy: {default: 2.0},
  },
  
  /*const serialLEDController = new SerialLEDController();
    const connect = document.getElementById('connect-to-serial');
    const getSerialMessages = document.getElementById('get-serial-messages');
    /*
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const submitButton = document.getElementById('submit-button');
    const serialMessagesContainer = document.getElementById('serial-messages-container');
  

    connect.addEventListener('pointerdown', () => {
      serialLEDController.init();

      serialMessagesContainer.removeAttribute('disabled');
      //messageInput.removeAttribute('disabled');
      //submitButton.removeAttribute('disabled');
    });

    /* This is where messages are sent from the input field to the Arduino
    messageForm.addEventListener('submit', event => {
      event.preventDefault();
      serialLEDController.write(event.target.firstElementChild.value);
      getSerialMessage();
    }); */

    getSerialMessages.addEventListener('pointerdown', async () => {
      getSerialMessage();
    });

    async function getSerialMessage() {
      serialMessagesContainer.innerText += await serialLEDController.read() + '\n';
    }
  init: function () {
    console.log('Hello, World!');
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.directionX = 0;
    this.directionY = 0;
  },
  play: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },
  pause: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);          
  },
  onKeyDown: function (evt) {
    switch (evt.keyCode) {
      case 37: this.directionX = 1; break;
      case 38: this.directionY = 1; break;
      case 39: this.directionX = -1; break;
      case 40: this.directionY = -1; break;
    }
  },
  onKeyUp: function (evt) {
    switch (evt.keyCode) {
      case 37: this.directionX = 0; break;
      case 38: this.directionY = 0; break;
      case 39: this.directionX = 0; break;
      case 40: this.directionY = 0; break;
    }          
  },
  tick: function (t, dt) {
    /* Send Timecode to Arduino */
    var myElement = document.getElementById("video");
    console.log(myElement.currentTime);
    //serialLEDController.write(myElement.currentTime);
    
    if (!this.data.enabled) { return; }
    var rotation = this.el.getAttribute('rotation');
    if (!rotation) { return; }
    if (this.directionX || this.directionY) {
      rotation.x += this.data.dx * this.directionY;
      rotation.y += this.data.dy * this.directionX;
      this.el.setAttribute('rotation', rotation);
    }
  }
});
