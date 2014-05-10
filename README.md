HaiViewer
=========

HaiViewer is a simple JavaScript based Channel Viewer Protocol client created by <a href="https://HaiThar.net/">HaiThar.net</a>.

Website integration
===================
HaiViewer is easy to integrate into any website simply include jQuery, the hai.viewer.js code and the base style sheet hai.viewer.css.

<link rel="stylesheet" type="text/css" href="hai.viewer.css" />
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js">
</script>
<script type="text/javascript" src="hai.viewer.js">
</script>

</code>
Next we need to place a div tag some where in your code for the channel viewer to display in.
<code>
<div id="haiViewer"></div>

</code>

Finally we need to create an instance of the HaiViewer and pass it some settings.
Create an object with the viewer settings there are 3 different settings.
<h4>source</h4>
This is the JSONP URL to your Channel Viewer Protocol (CVP), your mumble server provider should supply you with this URL.
<h4>target - optional</h4>
This is the target div for the viewer. You can pass anything that jQuery accepts.
Defaults to '#haiViewer'
<h4>refreshInterval - optional</h4>
This is how often the viewer will update, generally the default is sufficient.
Defaults to 5
<code>
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

</code>


<h2>Style</h2>
The viewer is designed to be easy to style all HTML elements have classes that start with haiViewer to avoid name space issues. The css file has been split into two different sections the first section <strong>Layout css</strong> contains all the css elements that deal with the layout of the viewer such as margins and padding. The second section is the <strong>Style css</strong> it contains all the css that deals with style such as colour, font, borders and images. The <strong>Style css</strong> section has plenty of comments and is all fairly self explanatory, it should be fast and easy to get the viewer to match your websites style by simply editing this part.
<h4>Image</h4>
The viewer requires one sprite image hai.viewer.png which contains the icons in order: 
<ul>
<li>Channel</li>
<li>User inactive</li>
<li>User active</li>
<li>Authenticated</li>
<li>Deaf</li>
<li>Mute</li>
</ul>
<h2>Licence</h2>
All contents of this project is released under the <a href="LICENSE">MIT License</a> which was distributed with this code. This allows you to use, distribute and/or modify this code and/or images for free or for pay.
