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
var renderer, scene, camera, raycaster; //necessary three.js components
var sphere;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var rotateX = 0;
var rotateY = 0;

initScene = function() {

    /************ Set up three.js scene with WebVR ************/

    // Instantiate scene
    scene = new THREE.Scene();
    var $container = $('#container'); //JQuery selector

    // Camera setup: vertical FOV, aspect ratio, clipping planes
    camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 10000);
    camera.position.z = 300;

    // Create virtual (refers to encoding) listener for all scene audio
    var listener = new THREE.AudioListener();
	camera.add( listener );

    //Create renderer, enable WebVR
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    renderer.vr.enabled = true;

    //Place scene on webpage
    container.appendChild( renderer.domElement );
    document.body.appendChild( WEBVR.createButton( renderer ) ); //webVR button

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
        vids[i].src = vidsrc[i];
        vids[i].setAttribute( 'webkit-playsinline', 'webkit-playsinline' ); //no fullscreen
        vids[i].load();

        // Create texture from video
        vidTex[i] = new THREE.VideoTexture (vids[i]);
        vidTex[i].minFilter = THREE.LinearFilter;
        vidTex[i].format = THREE.RGBFormat;

        // Create material from texture
        vidMat[i] = new THREE.MeshBasicMaterial({ map: faceTexture, side: THREE.DoubleSide});

        // Instantiate plane with video material
        childPlanes[i]= new THREE.Mesh( cpGeometry, faceMaterial );

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

    /************ Enable interaction with RAYCASTING! ************/

    // Templates for invisible planes
    var vertBounds = new THREE.PlaneGeometry( 50, 25, 32 );
    var horizBounds = new THREE.PlaneGeometry( 25, 50, 32 );
    var boundsMat = new THREE.MeshBasicMaterial( {color: 0x248f24, alphaTest: 0, visible: false} );

    // Create 4 invisible planes
    var downBound = new THREE.Mesh( vertBounds, boundsMat );
    var upBound = new THREE.Mesh( vertBounds, boundsMat );
    var leftBound = new THREE.Mesh( horizBounds, boundsMat );
    var rightBound = new THREE.Mesh( horizBounds, boundsMat );
    downBound.name = "d"; upBound.name = "u"; leftBound.name = "l"; rightBound.name = "r";

    // Position invisible planes in front of hierarchy
    downBound.position.z = upBound.position.z = leftBound.position.z = rightBound.position.z = -100;
    downBound.position.y = leftBound.position.x = -25;
    upBound.position.y = rightBound.position.x = 25;
    scene.add( downBound ); scene.add( upBound ); scene.add( leftBound ); scene.add( rightBound );

    raycaster = new THREE.Raycaster();

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
    sound.play();

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
  processInput();
  update();
  renderer.render(scene,camera);
}

function processInput() {
 // Update the raycaster so it projects directly out from the camera (i.e. headset)
  var r1 = new THREE.Vector3;
  var r2 = new THREE.Vector3;
  raycaster.set(camera.getWorldPosition(r1), camera.getWorldDirection(r2));

    // Intersects: list of meshes hit by ray from raycaster
    var intersects = raycaster.intersectObjects(scene.children);

    //If user is looking at a boundary, instruct the hierarchy to rotate toward it
    if (intersects.length > 0) {
        if (intersects[0].object.name === "d"){
            rotateY = -1;
        }
        else if (intersects[0].object.name === "u"){
            rotateY = 1;
        }
        else if (intersects[0].object.name === "l"){
            rotateX = 1;
        }
        else if (intersects[0].object.name === "r"){
            rotateX = -1;
        }
        else {
            rotateY = 0;
            rotateX = 0;
        }
    }
}

function update(){
    //rotate hierarchy based on direction of gaze input

    if (rotateX == 1){
        sphere.rotation.y += .05;
    }
    else if (rotateX == -1){
        sphere.rotation.y -= .05;
    }
    else if (rotateY == 1){
        sphere.rotation.x += .05;
    }
    else if (rotateY == -1){
        sphere.rotation.x -= .05;
    }

    //shader animation
    var delta = clock.getDelta();
    customUniforms.time.value += delta;
}
