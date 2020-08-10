//(3 a) Define your global variables
var renderer;
var scene;
var camera;

var sphere;
var WIDTH;
var HEIGHT;
var rotateX = 0;
var rotateY = 0;

var face, feet, eyes, hands, handsup, back;

var isPlaying = 0;
var listener;

// initialize a global clock to keep track of time
this.clock = new THREE.Clock();

var noiseTexture = new THREE.ImageUtils.loadTexture( './textures/soap.jpg' );
noiseTexture.wrapS = noiseTexture.wrapT = THREE.MirroredRepeatWrapping;

var lavaTexture = new THREE.ImageUtils.loadTexture( './textures/oil.jpg' );
lavaTexture.wrapS = lavaTexture.wrapT = THREE.MirroredRepeatWrapping;

// create global uniforms object so its accessible in update method
this.customUniforms = {
    baseTexture:  { type: "t", value: lavaTexture },
    baseSpeed:    { type: "f", value: 0.05 },
    noiseTexture: { type: "t", value: noiseTexture },
    noiseScale:   { type: "f", value: 0.5337 },
    alpha:        { type: "f", value: 1.0 },
    time:         { type: "f", value: 1.0 }
}

// create custom material from the shader code above within specially labeled script tags
var customMaterial = new THREE.ShaderMaterial(
{
    uniforms: customUniforms,
    vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
}   );


initializeScene = function() {
    /************** Set up the scene **********************/
    //1: video setup
    face = document.createElement( 'video' );
    face.width = 40;
    face.height = 40;
    face.loop = true;
    face.muted = true;
    face.src = "./video/face.mp4";
    face.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );

    feet = document.createElement( 'video' );
    feet.width = 40;
    feet.height = 40;
    feet.loop = true;
    feet.muted = true;
    feet.src = "./video/feet.mp4";
    feet.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );

    eyes = document.createElement( 'video' );
    eyes.width = 40;
    eyes.height = 40;
    eyes.loop = true;
    eyes.muted = true;
    eyes.src = "./video/eyes.mp4";
    eyes.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );

    handsup = document.createElement( 'video' );
    handsup.width = 40;
    handsup.height = 40;
    handsup.loop = true;
    handsup.muted = true;
    handsup.src = "./video/handsup.mp4";
    handsup.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );

    back = document.createElement( 'video' );
    back.width = 40;
    back.height = 40;
    back.loop = true;
    back.muted = true;
    back.src = "./video/back.mp4";
    back.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );

    hands = document.createElement( 'video' );
    hands.width = 40;
    hands.height = 40;
    hands.loop = true;
    hands.muted = true;
    hands.src = "./video/hands.mp4";
    hands.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );


    // (2) Set the size of the container where we're going to be drawing things
	WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    // (3 b) Instatiate the scene
    scene = new THREE.Scene();

	// (4) Get a place on the webpage to put the scene
    var $container = $('#container');

	// (5) Set some camera attributes
    var ASPECT_RATIO = WIDTH/HEIGHT;
	var NEAR_PLANE = 0.1;
	var FAR_PLANE = 10000;
	var  CAMERA_ANGLE = 45;

	// (6) Set-up a Camera
    camera = new THREE.PerspectiveCamera(CAMERA_ANGLE,
											ASPECT_RATIO,
											NEAR_PLANE,
											FAR_PLANE);



	// (7) Put the camera somewhere useful
    camera.position.z = 300;

    listener = new THREE.AudioListener();
	camera.add( listener );

    // (8) Create a WebGL Renderer
    renderer = new THREE.WebGLRenderer();

	// (9) Tell the renderer how many pixels it has to work with
    renderer.setSize(WIDTH, HEIGHT);

	// (10) Link the renderer to the webpage
    $container.append(renderer.domElement);

    /************ Now let's draw something! **********************/
	// (11) Create a material for our object
    /*var sphereMaterial = new THREE.MeshLambertMaterial(
	{
		color: 0xCC0000
	});*/

	// (12) Define how finely we want to divide a sphere mesh



    var radius = HEIGHT/8, segments = 64, rings = 64;

	// (13) Create a new mesh with sphere geometry
    sphere = new THREE.Mesh(
		new THREE.SphereGeometry(radius, segments, rings),
		customMaterial);

	// (14) Add the sphere to the scene
    scene.add(sphere);
    var sound = new THREE.PositionalAudio( listener );
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( './audio/ysc.mp3', function( buffer ) {
    	sound.setBuffer( buffer );
    	sound.setRefDistance( 20 );
    	sound.play();
    });
    sphere.add(sound);


    // Create six planes with different videos playing

    var cpGeometry = new THREE.PlaneGeometry( radius*0.8, radius*0.8, 32 );

    var faceTexture = new THREE.VideoTexture( face );
    faceTexture.minFilter = THREE.LinearFilter;
    faceTexture.format = THREE.RGBFormat;
    var faceMaterial = new THREE.MeshBasicMaterial({ map: faceTexture, side: THREE.DoubleSide});

    var feetTexture = new THREE.VideoTexture( feet );
    feetTexture.minFilter = THREE.LinearFilter;
    feetTexture.format = THREE.RGBFormat;
    var feetMaterial = new THREE.MeshBasicMaterial({ map: feetTexture, side: THREE.DoubleSide});

    var eyesTexture = new THREE.VideoTexture( eyes );
    eyesTexture.minFilter = THREE.LinearFilter;
    eyesTexture.format = THREE.RGBFormat;
    var eyesMaterial = new THREE.MeshBasicMaterial({ map: eyesTexture, side: THREE.DoubleSide});

    var handsupTexture = new THREE.VideoTexture( handsup );
    handsupTexture.minFilter = THREE.LinearFilter;
    handsupTexture.format = THREE.RGBFormat;
    var handsupMaterial = new THREE.MeshBasicMaterial({ map: handsupTexture, side: THREE.DoubleSide});

    var backTexture = new THREE.VideoTexture( back );
    backTexture.minFilter = THREE.LinearFilter;
    backTexture.format = THREE.RGBFormat;
    var backMaterial = new THREE.MeshBasicMaterial({ map: backTexture, side: THREE.DoubleSide});

    var handsTexture = new THREE.VideoTexture( hands );
    handsTexture.minFilter = THREE.LinearFilter;
    handsTexture.format = THREE.RGBFormat;
    var handsMaterial = new THREE.MeshBasicMaterial({ map: handsTexture, side: THREE.DoubleSide});

    //front

    var offset = radius * 1.3;

    var childPlane1 = new THREE.Mesh( cpGeometry, faceMaterial );
    childPlane1.position.z = offset;
    //back
    var childPlane2 = new THREE.Mesh( cpGeometry, feetMaterial );
    childPlane2.position.z = -offset;
    //left
    var childPlane3 = new THREE.Mesh( cpGeometry, eyesMaterial );
    childPlane3.rotation.y = THREE.Math.degToRad( 90 );
    childPlane3.position.x = -offset;
    //right
    var childPlane4 = new THREE.Mesh( cpGeometry, handsupMaterial );
    childPlane4.rotation.y = THREE.Math.degToRad( 90 );
    childPlane4.position.x = offset;
    //bot
    var childPlane5 = new THREE.Mesh( cpGeometry, backMaterial );
    childPlane5.rotation.x = THREE.Math.degToRad( 90 );
    childPlane5.position.y = -offset;
    //top
    var childPlane6 = new THREE.Mesh( cpGeometry, handsMaterial );
    childPlane6.rotation.x = THREE.Math.degToRad( 90 );
    childPlane6.position.y = offset;

    sphere.add(childPlane1);
    sphere.add(childPlane2);
    sphere.add(childPlane3);
    sphere.add(childPlane4);
    sphere.add(childPlane5);
    sphere.add(childPlane6);


	// (15) And the camera
    scene.add(camera);

	// (16) Create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

	// (17) Put it somewhere
    pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// (18) Add the light to the scene
    scene.add(pointLight);


    face.play();
    feet.play();
    eyes.play();
    handsup.play();
    back.play();
    hands.play();
}

window.onload = function() {
  initializeScene();

  requestAnimationFrame(mainLoop);
  //renderer.setAnimationLoop( mainLoop );

  function mainLoop()
  {
    //(process input)
    //(update model)
    update();
    // (19) Draw!
    renderer.render(scene,camera);

    requestAnimationFrame(mainLoop);
  }
}

function update(){
    //console.log("This is rotateX:" + rotateX);
    //rotate left and right
    if (rotateX == 1){
        sphere.rotation.y += .005;
    }
    else if (rotateX == -1){
        sphere.rotation.y -= .005;
    }
    //rotate up and down
    else if (rotateY == 1){
        sphere.rotation.x += .005;
    }
    else if (rotateY == -1){
        sphere.rotation.x -= .005;
    }

    var delta = clock.getDelta();
    customUniforms.time.value += delta;
}

//Rotate on Mouse Move

//callback function for mouse move event listener
function rotateOnMouseMove(e) {
    e = e || window.event;

    //if (isPlaying == 0)
        //isPlaying = 1;




    var moveX = ( e.clientX / WIDTH ) * 2 - 1;
    var moveY = ( e.clientY / HEIGHT ) * 2 - 1;

    //store x data
    if (moveX > 0.5) {
        rotateX = 1;
    }
    else if (moveX < -0.5) {
        rotateX = -1;
    }
    else {
        rotateX = 0;
    }

    //store y data
    if (moveY > 0.5) {
        rotateY = 1;
    }
    else if (moveY < -0.5) {
        rotateY = -1;
    }
    else {
        rotateY = 0;
    }
}

//on mousemove, call rotateOnMouseMove
document.addEventListener('mousemove', rotateOnMouseMove);
