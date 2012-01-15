var win = Ti.UI.currentWindow;

// Thanks
var hLayout1 = Ti.UI.createView({
	top: 8,
	left: 12,
	right: 10,
	//bottom: 8,
	height:'auto',
	layout:'vertical'
});
var thanksLabel = Ti.UI.createLabel({
	text: 'Thanks for using lalali!\n\nTranslations are made using',
	font:{fontSize: 16, fontFamily:'Helvetica'},
	color:'000000',
	height:'auto',
	width: 'auto',
	top:0,
	left:0,
	link: true
});
hLayout1.add(thanksLabel);
var googleTranslateLink = Ti.UI.createLabel({
	text: 'Google Translate',
	font:{fontSize: 16, fontFamily:'Helvetica'},
	color:'4f85af',
	width:'auto',
	height:'auto',
	left:0,
	top:4*16 +4,
	left: 12
});
googleTranslateLink.addEventListener('click', function(e){
	Ti.Platform.openURL('http://code.google.com/apis/language/');
});
//hLayout1.add(googleTranslateLink);
var thanksRow = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	height:6*16,
	backgroundColor:'FFFFFF'
});
/*thanksRow.addEventListener('click', function(e){
	googleTranslateLink.fireEvent('click');
});*/
var thanksSection = Ti.UI.createTableViewSection({
	headerTitle: 'Credits'
});
thanksRow.add(hLayout1);
thanksRow.add(googleTranslateLink);
thanksSection.add(thanksRow);

// Version
var versionLabel = Ti.UI.createLabel({
	text: 'Version 1.0',
	font:{fontSize: 16, fontFamily:'Helvetica'},
	color:'000000',
	height:'auto',
	top: 8,
	left: 12,
	bottom: 10,
	right: 10
});
var versionRow = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	height:'auto',
	backgroundColor:'FFFFFF'
});
var versionSection = Ti.UI.createTableViewSection({
	headerTitle: ''
});
versionRow.add(versionLabel);
versionSection.add(versionRow);

// Credits
var creditsLabel = Ti.UI.createLabel({
	text: 'Developed by Guillaume Flandre\n\nAny comment or question?\nAsk',
	font:{fontSize: 16, fontFamily:'Helvetica'},
	color:'000000',
	height:'auto',
	top: 8,
	left: 12,
	bottom: 10,
	right: 10
});
var twitterLink = Ti.UI.createLabel({
	text: '@gflandre',
	font:{fontSize: 16, fontFamily:'Helvetica'},
	color:'4f85af',
	height:'auto',
	top: 70,
	left: 45,
	bottom: 10,
	right: 10
});
twitterLink.addEventListener('click', function(e){
	Ti.Platform.openURL('http://www.twitter.com/gflandre');
});
var creditsEndLabel = Ti.UI.createLabel({
	text: 'on Twitter',
	font:{fontSize: 16, fontFamily:'Helvetica'},
	color:'000000',
	height:'auto',
	top: 70,
	left: 125,
	bottom: 10,
	right: 10
});
var creditsRow = Ti.UI.createTableViewRow({
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	height:'auto',
	backgroundColor:'FFFFFF'
});
var creditsSection = Ti.UI.createTableViewSection({
	headerTitle: ''
});
creditsRow.add(creditsLabel);
creditsRow.add(twitterLink);
creditsRow.add(creditsEndLabel);
creditsSection.add(creditsRow);

var data = [thanksSection, versionSection, creditsSection];

var tableView = Ti.UI.createTableView({
	style: Ti.UI.iPhone.TableViewStyle.GROUPED,
	data: data,
	backgroundColor: 'E4E4E4'
});

win.add(tableView);