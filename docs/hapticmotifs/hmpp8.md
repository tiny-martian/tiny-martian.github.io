# Haptic Motifs Progress Post 8 and Email to Advisors

*May 26, 2020, on progress blog*

## A-Frame Research
I should have gone with browser-based VR all along. I’ve already found some functions that will make this project so much easier.

* https://github.com/etiennepinchon/aframe-videoplayer/blob/master/js/AVideoPlayer.js Video player using AFrame! Need to turn this video texture into a skybox, but that should be easily done with https://aframe.io/docs/1.0.0/primitives/a-videosphere.html#sidebar. Will be useful for getting timecode of video
* https://aframe.io/docs/1.0.0/components/camera.html#reading-world-position-or-rotation-of-the-camera AFrame method for getting the device orientation!

I still need: a good method for serial communication between the browser and Arduino, found this but I need to do more research, and a good method for storing/encoding the information for the motors. Should probably be handled on the Arduino end.

## For next week, my goal is to write a working prototype that:

* (in browser) maps an equirectangular video to a sphere,
* (in browser) implements working video player controls,
* (in browser) serially communicates the video timecode and device orientation to Arduino as often as possible,
* (in Arduino) reads in a file with a set of motor combinations mapped to timecodes, and
* (in Arduino) using that information and the current headset orientation, updates the headband accordingly.

Most likely I won’t get all of this done, but it would be a huge step forward for this project!

## Reading: Ali Israr and Disney Research
Paper 1: Yet another vibrating chair, this one is paired with 360 content and conveys dramatically meaningful haptic patterns. I like his definition of ‘feel effects’: “correlated semantic
interpretations of events in a story to a parametric composition of sensations.” The design of the chair is also interesting. However, I’m irritated by the TINY sample size for the study (seven participants? Really? How hard can it be for Disney to find participants?!)

Paper 2: Haptics benefiting young children’s story comprehension. I didn’t get a lot from this, but I would be interested to look more into the library of “feel effects” Israr describes using in these papers and how they were designed.

*June 15, 2020: email to advisors*

Hi Amy and Daniel! I realize I've let a few weeks go by without checking in, so here's a quick progress report.

Since our last meeting, this is what I've done:

1. Tested out the Ricoh Theta V, and the mobile & desktop apps. They are so much easier to work with! I'm going to upload some of the sample footage I've been taking to Youtube tonight, and will send another email with the link.

2. Written an A-frame sketch that implements the "videosphere" object and grabs its current timecode & camera orientation. This is exciting, because the current timecode and camera orientation of the scene are the two arguments I will need to pass to the Arduino to turn on the right motors at the right times! ...In an incredibly annoying turn of events, Glitch has BLOCKED me from accessing this sketch because it "violates their terms of service." I have no idea why, and I'm trying to get in contact with their support team to get the code back. I should have saved a backup on a different platform. :(

3. Struggled with web serial solutions. My two attempts to do this have been with the Web Serial API and p5.js. Each has its own drawbacks. The Web Serial API is still in development, and has been challenging for me to implement as an inexperienced Javascript programmer. I have tried running various tutorials/demos with my own Arduino and haven't gotten any to work yet, which is puzzling. If one of you could try running the tutorial above with your own Arduino, I would be curious to know if the mistake is on my end or with the source code.In contrast, p5 has much better documentation and I have implemented their serial communication successfully before. However, I don't think it is possible to smoothly integrate p5 and A-frame scenes together in the same project. While it's probably possible to put them side by side, I'm once again struggling to figure that out as an inexperienced Javascript programmer, and haven't been able to find any tutorials or examples that include both p5.js and A-frame scenes running side by side.

In conclusion... I haven't wanted to meet while troubleshooting all of this, but now that I'm almost done implementing this code, I would appreciate some advice on the serial communication side. If tomorrow at 11:30 still works for you both as a meeting time, I would love to catch up and see if we can figure out any solutions.

Thank you for reading all of this and for your patience in general! I hope everything is going well for both of you.
