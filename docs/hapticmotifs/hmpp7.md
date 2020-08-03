# Haptic Motifs: Progress Post 7

*May 12, 2020: At this point I wanted to start a new stage of this project, outlined below. It didn't go very far, but still had some pretty cool ideas. :)*

This post is an introduction to my new personal research project, which I’m informally calling “Haptic Motifs”. Read on for my inspiration/context, idea, and initial questions!

## Context & Idea
So, good attention guiding can greatly improve the experience of a cinematic VR storytelling piece, but it can’t improve the story. I want to explore how a programmable vibrotactile headband could be used to do both.

In my research project before Haptic Motifs, here, I looked into how head-mounted vibrotactile feedback could guide the attention of a user through a 360 video piece. By the end of the project, I was thinking about coding complex compositions of active and inactive motors, used to indicate the locations of points of interest in a video scene. This led me to think about using those compositions to indicate other aspects of a scene, including emotional themes… almost like a soundtrack.

Cinematic soundtracks can contribute a lot of important and unique information to a story: setting a mood and sense of place, increasing or decreasing tension, describing individual characters with musical motifs. I’m curious about using a haptic composition to accomplish the same, while also providing attention guidance in a scene. There are many interesting research questions here, summarized by: How can emotional themes, character/event motifs, or points of interest be represented as sequences of vibrations on a headband, and how could those be designed to be effectively combined in larger compositions (“haptic soundtracks”) to accompany 360 content?

Initially looking into this, I can see that many groups are trying to encode audio as haptic experiences for the deaf and hard of hearing. In addition, there’s the space of “4D” cinema, such as chairs that can shake and rotate the people sitting in them at a movie theater. While both of those are great precedents, neither are focused on trying to create a new symbolic haptic syntax to represent narrative concepts, which is my interest. I found this paper, “The Effect of Vibrotactile Stimulation on the Emotional Response to Horror Films”, to be an interesting place to start. This research group focused on using vibrotactile feedback to represent specific emotions and emotional intensity, not just to replicate a musical experience or get an adrenaline rush.

## Initial Questions
Here’s my initial brain dump of questions that could be interesting to explore:

### Design
* What are different approaches I could use to represent emotions with the headband? How effective are they? Could a user identify moods or changes between moods represented in this way?
* How many distinct sequences (example: representing multiple active points of interest around a 360 scene) can be active at a time without just blurring into a buzzy mess?
* Could vibrotactile sequences be used well as character motifs, or to indicate other aspects of a scene (ex.: a certain sequence indicates that the character speaking is not telling the truth?)
* Could sequences representing points of interest in a 360 scene and sequences representing emotions or motifs be distinguished when combined in larger compositions? What design parameters could be altered to make that more effective?
* David Parisi describes a vision of ‘haptocentric’ storytelling where “(we) focused first on authoring content for touch, and then layered images and sounds on top of a haptic foundation”. How completely could narratives be told with only the headband? Ex., could a haptic soundtrack on the headband be paired with a random 360 stock video to give it a sense of story?
### Development
* The headband prototype that I’m currently using does not spark joy. It’s too aggressive, with “on” and “off” modes for each motor instead of levels of intensity. How could I build a better headband that would allow for more sophisticated vibration sequences?
* I became stuck in my previous project on designing a good data structure for representing multiple vibration sequences along a video timeline.
* How could I make this as accessible as possible (browser-based VR, easy to get to users for testing during social distancing?)
* On that: could I easily create a “plug and play” tool for creating haptic compositions to accompany 360 video?

We’ll see!
