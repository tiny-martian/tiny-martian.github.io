/*
 * Lillie Bahrami, 2020
 *
 * Main features: animated shader, audio, video, WebVR, raycasting gaze controls
 * Instructions: Tilt head towards a plane to rotate it to the front.
 *
 * All videos & photography are my own work
 * Song: "You're So Cold", by artist Two Feet (used with permission)
*/

//Global variables
var renderer, scene, camera; //necessary three.js components
var sphere;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var rotateX = 0;
var rotateY = 0;

initScene = function() {

    /************ Set up three.js scene without WebVR ************/

    // Instantiate scene
    scene = new THREE.Scene();
    var $container = $('#container'); //JQuery selector

    // Camera setup: vertical FOV, aspect ratio, clipping planes
    camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 10000);
    camera.position.z = 300;

    // Create virtual (refers to encoding) listener for all scene audio
    var listener = new THREE.AudioListener();
	camera.add( listener );

    //Create renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    //renderer.vr.enabled = true;

    //Place scene on webpage
    container.appendChild( renderer.domElement );
    //document.body.appendChild( WEBVR.createButton( renderer ) ); //webVR button

    /************ Create scene content (3D geometries) ************/

    /*
     * SPHERE WITH ANIMATED GLSL SHADER
     * (adapted from https://stemkoski.github.io/Three.js/Shader-Fireball.html)
     *
     * vertexShader, fragmentShader in index.html blend noiseTexture,
     * mainTexture & randomly distort vertices to animate the sphere
     */

	// Photographs used as textures for animated shader
    var noiseTexture = new THREE.ImageUtils.loadTexture( '../socold/textures/soap.jpg' );
    var mainTexture = new THREE.ImageUtils.loadTexture( '../socold/textures/oil.jpg' );

    // wrapS, wrapT: X, Y UV wrapping params. repeat infty, mirror on each rep
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.MirroredRepeatWrapping;
    mainTexture.wrapS = mainTexture.wrapT = THREE.MirroredRepeatWrapping;

    //GLSL uniforms are global vars passed to the shader
    this.customUniforms = {
        baseTexture:  { type: "t", value: mainTexture },
        baseSpeed:    { type: "f", value: 0.02 },
        noiseTexture: { type: "t", value: noiseTexture },
        noiseScale:   { type: "f", value: 0.5337 },
        alpha:        { type: "f", value: 1.0 },
        time:         { type: "f", value: 1.0 }
    }

    // Create custom material using texture and shader scripts in index.html
    var customMaterial = new THREE.ShaderMaterial(
    {
        uniforms: customUniforms,
        //this shader is applied to every vertex of the mesh
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        //this shader is applied to every triangle of the mesh
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    }   );

    //Create sphere geometry with the custom shader defined above
    var radius = HEIGHT/8, segments = 32, rings = 32;
    sphere = new THREE.Mesh(
		new THREE.SphereGeometry(radius, segments, rings),
		customMaterial);

    scene.add(sphere);

    /*
     * PLANES WITH VIDEO TEXTURES
     */

    var vidSrc = new Array("../socold/video/face.mp4", "../socold/video/feet.mp4",
                            "../socold/video/eyes.mp4", "../socold/video/back.mp4",
                            "../socold/video/hands.mp4", "../socold/video/handsup.mp4")
    var vids = new Array(6);
    var vidTex = new Array(6);
    var vidMat = new Array(6);
    var childPlanes = new Array(6);

    //Create a plane geometry template
    var cpGeometry = new THREE.PlaneGeometry( radius*0.8, radius*0.8, 32 );
    var offset = radius * 1.4;
    var i;

    //Create 6 planes playing different videos as children of the sphere
    for (i = 0; i < vids.length; i++){
        //Instantiate video element
        vids[i] = document.createElement( 'video' );
        vids[i].width = vids[i].height = 40;
        vids[i].loop = vids[i].muted = true;
        vids[i].src = vidSrc[i];
        vids[i].setAttribute( 'webkit-playsinline', 'webkit-playsinline' ); //no fullscreen
        vids[i].load();

        // Create texture from video
        vidTex[i] = new THREE.VideoTexture (vids[i]);
        vidTex[i].minFilter = THREE.LinearFilter;
        vidTex[i].format = THREE.RGBFormat;

        // Create material from texture
        vidMat[i] = new THREE.MeshBasicMaterial({ map: vidTex[i], side: THREE.DoubleSide});

        // Instantiate plane with video material
        childPlanes[i]= new THREE.Mesh( cpGeometry, vidMat[i] );

        //Orient plane
        switch (i) {
            case 0:
                childPlanes[i].position.z = offset;
                break;
            case 1:
                childPlanes[i].position.z = -offset;
                break;
            case 2:
                childPlanes[i].rotation.y = THREE.Math.degToRad( 90 );
                childPlanes[i].position.x = offset;
                break;
            case 3:
                childPlanes[i].rotation.y = THREE.Math.degToRad( 90 );
                childPlanes[i].position.x = -offset;
                break;
            case 4:
                childPlanes[i].rotation.x = THREE.Math.degToRad( 90 );
                childPlanes[i].position.y = offset;
                break;
            case 5:
                childPlanes[i].rotation.x = THREE.Math.degToRad( 90 );
                childPlanes[i].position.y = -offset;
                break;
            default:
                break;
        }

        //Parent plane to sphere, which controls rotation of hierarchy
        sphere.add(childPlanes[i]);
    }

    // Move sphere to final pos AFTER creating hierarchy
    sphere.position.z = -300;

	/************** Final scene setup **************/

    //add light
    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
    scene.add(pointLight);

    //load and play song
    var sound = new THREE.PositionalAudio( listener );
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../socold/audio/ysc.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setRefDistance( 20 );
    });
    sphere.add(sound);
    //sound.play();

    //begin playback
    var j = 0;
    for (j = 0; j < vids.length; j++){
        vids[j].play();
    }

    //wait to add camera until everything else has been set up
    scene.add(camera);
}

// event handler runs on webpage load
window.onload = function() {

  // global clock used for anim shader
  this.clock = new THREE.Clock();
  initScene();

  //setAnimationLoop required for WebVR
  renderer.setAnimationLoop( mainLoop );

}

// runs on every frame
function mainLoop()
{
  //processInput();
  update();
  renderer.render(scene,camera);
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
