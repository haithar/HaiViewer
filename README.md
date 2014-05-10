HaiViewer
=========

HaiViewer is a simple JavaScript based Channel Viewer Protocol client created by (HaiThar.net)[https://HaiThar.net].

Website integration
-------------------
HaiViewer is easy to integrate into any website simply include jQuery, the hai.viewer.js code and the base style sheet hai.viewer.css.

	<link rel="stylesheet" type="text/css" href="hai.viewer.css" />
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js"> </script>
	<script type="text/javascript" src="hai.viewer.js"> </script>

Next we need to place a div tag some where in your code for the channel viewer to display in.

`<div id="haiViewer"></div>`

Finally we need to create an instance of the HaiViewer and pass it some settings.
Create an object with the viewer settings there are 3 different settings.

### source
This is the JSONP URL to your Channel Viewer Protocol (CVP), your mumble server provider should supply you with this URL.

### target - optional
This is the target div for the viewer. You can pass anything that jQuery accepts.
Defaults to '#haiViewer'

### refreshInterval - optional
This is how often the viewer will update, generally the default is sufficient.
Defaults to 5

	<script type="text/javascript">
	$( document ).ready(function() {
		var settings = {
			source: 'https://haithar.net/cvp/VGJuYeSJZgeJGoWf?callback=?',
			target: '#haiViewer',
			refreshInterval: 5,
		};
	
		hai = new HaiViewer(settings);
	});
	</script>


Style
-----

The viewer is designed to be easy to style all HTML elements have classes that start with haiViewer to avoid name space issues. The css file has been split into two different sections the first section *Layout css* contains all the css elements that deal with the layout of the viewer such as margins and padding. The second section is the *Style css* it contains all the css that deals with style such as colour, font, borders and images. The *Style css* section has plenty of comments and is all fairly self explanatory, it should be fast and easy to get the viewer to match your websites style by simply editing this part.

### Image
The viewer requires one sprite image hai.viewer.png which contains the icons in order:
+ Channel
+ User inactive
+ User active
+ Authenticated
+ Deaf
+ Mute

Licence
-------
All contents of this project is released under the (MIT License)[LICENSE] which was distributed with this code. This allows you to use, distribute and/or modify this code and/or images for free or for pay.
