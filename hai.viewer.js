/* HaiViewer
 * 2014 HaiThar.net
 * Released under the terms of the MIT license.
 */

function HaiViewer(settings) {
	var self = this;
	self.settings = settings;

	if (self.settings.refreshInterval === undefined)
		self.settings.refreshInterval = 5;

	if (self.settings.target === undefined)
		self.settings.target = '#haiViewer';

	if (self.settings.refreshInterval < 1)
		self.settings.refreshInterval = 1;

	self.render = function(data) {
		var html = $(self.settings.target);

		$(self.settings.target).html('');

		if (data.x_connecturl)
			html.append('<a href="' + data.x_connecturl + '" title="connect">' + data.name + '</a>');
		else
			html.append('<a href="#">' + data.name + '</a>');

		var container = $('<div class="haiViewerContainer">');
		var root = $('<ul>');

		if (data.root.users.length > 0) {
			for (var i = 0; i < data.root.users.length; i++) {
				root.append(self.renderUser(data.root.users[i]));
			}
		}

		if (data.root.channels.length > 0) {
			for (var i = 0; i < data.root.channels.length; i++) {
				root.append(self.renderChannel(data.root.channels[i]));
			}
		}
		
		container.append(root);

		html.append(container);

		return html;
	};

	self.renderChannel = function(channel) {
		var html = $('<li class="channel">');

		var tooltip = 'Users: ' + Math.round(channel.users.length) + "\r\nChannels: " + Math.round(channel.channels.length);
		html.append('<span title="' + tooltip + '"><span class="channelIcon"></span>' + channel.name + '</span>');

		if (channel.users.length > 0) {
			for (var i = 0; i < channel.users.length; i++) {
				html.append(self.renderUser(channel.users[i]));
			}
		}

		if (channel.channels.length > 0) {
			var channels = $('<ul>');
			
			for (var i = 0; i < channel.channels.length; i++) {
				channels.append(self.renderChannel(channel.channels[i]));
			}
			channels.append('</ul>');
			html.append(channels);
		}

		html.append('</li>');

		return html;
	};

	self.renderUser = function(user) {
		var html = $('<li class="user">');

		if (user.idlesecs < self.settings.refreshInterval + 1)
			html.append('<span class="active statusIcon" title="active"></span>');
		else
			html.append('<span class="idle statusIcon" title="idle"></span>');

		var tooltip = '';
		if (typeof user.x_ping != 'undefined')
			tooltip = 'Ping: ' + Math.round(user.x_ping) + "ms\r\n";
		
		tooltip = tooltip + 'Idle: ' + self.parseTime(user.idlesecs) + "\r\nOnline: " + self.parseTime(user.onlinesecs) + "\r\nOS: " + user.os;
		var span = $('<span title="' + tooltip + '">');

		span.append(user.name);
		html.append(span);

		if (user.userid > 0)
			html.append('<span class="authenticated statusIcon" title="authenticated"></span>');

		if (user.selfDeaf || user.deaf)
			html.append('<span class="deaf statusIcon" title="deaf"></span>');

		if (user.selfMute || user.mute || user.suppress)
			html.append('<span class="mute statusIcon" title="mute"></span>');

		return html;
	};

	self.parseTime = function(time) {
		var myTime = [];
		myTime[0] = ["seconds",1];
		myTime[1] = ["minutes", 60];
		myTime[2] = ["hours",3600];
		myTime[3] = ["days", 86400];
		myTime[4] = ["weeks", 604800];
		myTime[5] = ["months", 2628000];
		myTime[6] = ["years", 31536000];

		var i = 1;
		while(i < 6 && (myTime[(i+1)][1]) < time) {
			i++;
		}
		var temp = Math.floor(time / myTime[i][1]);
		var j = i - 1;
		return temp + " " + myTime[i][0] + " " + Math.round((time - (temp * myTime[i][1])) / myTime[j][1]) + " " + myTime[j][0];
	};

	self.fetch = function() {
		$.getJSON(self.settings.source, function(data) {
			if (data.error) {
				$(self.settings.target).append('ERROR: ' + data.error);
			} else {
				self.render(data);
			}
		});
	};

	
	self.fetch();
	$(self.settings.target).addClass('haiViewerBox');
	setInterval(self.fetch, self.settings.refreshInterval * 1000);
}