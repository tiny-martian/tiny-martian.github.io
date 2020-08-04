# Haptic Motifs Progress Post #5

*March 20, 2020: Updates and a new plan, after a posting hiatus (I was working on artistic prototypes for my personal project, which unfortunately fell through due to COVID.)*

## Updates & Plan
Over the last few months, I’ve been:

* Writing a rough draft of my script
* Researching head-mounted vibrotactile displays
* Working on some minimal 360* camera and Arduino tests
* Meeting with Dr. Amy Banic from the University of Wyoming to discuss this project and interaction design for cinematic VR
* Visiting the Boulder International Film Festival’s VR pavilion earlier in March.

As with everything else at CU Boulder this semester, my UROP project has been affected by COVID-19. Here are some things I was planning on that I’ll no longer be able to do:

* Attend SXSW 2020 (would have been a week-long trip involving lectures by expert creators and a large cinematic VR showcase.)
* Use maker spaces and other resources on campus to build my prototype
* Use an HTC Vive or Oculus Rift headset for development (this is going to be difficult to get around)
* Recruit actors and production assistants and begin shooting.

So what now? These are the next steps I can think of that are easy for me to do from home with my current resources:

* Finish my rough draft and send it out for feedback
* Order more motors from Sparkfun, get some velcro, make a basic headband, and hook it all up to Unity
* Get some more fun 360* video shots!

## Arduino and Vibrating Motors Test

Two vibrating motors connected to an Arduino making funny noises. [Video here](https://vimeo.com/399251443)

`void setup() {
  pinMode(2, OUTPUT);
  pinMode(4, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  Serial.println("Drop that beat!");
  
  digitalWrite(2, HIGH);
  digitalWrite(4, HIGH);
  delay(1000);
  digitalWrite(2, LOW);
  digitalWrite(4, LOW);

  delay(500);

  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);

  delay(500);
  
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);

  delay(1000);
      
}`

## Recent Reading: Papers on Vibrotactile HMDs
* https://www.youtube.com/watch?v=tiOQqkQ8PnU ProximityHat: pressure on a certain part of the head is responsive to how close the wearer is to an object in that direction
* https://www.youtube.com/watch?v=_H0MQy6QD7M&feature=youtu.be Headband with sensors on forehead indicating direction of targets, frequency indicates elevation
* https://pdfs.semanticscholar.org/f468/f60be2d709f926ff5661af1f0a17d373c5c7.pdf Left and right sensors on forehead to indicate direction– tested multiple combinations of modalities, chaotic vs. smooth target transitions
