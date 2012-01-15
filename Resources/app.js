Ti.include('lib/json2.js');
Ti.include('include/Translation.js');

// UI
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;

Titanium.UI.setBackgroundColor('#E4E4E4');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	barColor:'#000000'
});

//
// create Search window
//
var winSearch = Titanium.UI.createWindow({  
    title:'Search',
	url:'windows/search.js',
	navBarHidden:true
});
var tabSearch = Titanium.UI.createTab({
	icon:'images/tab_search.png', 
    title:'Translate',
    window:winSearch
});

//
// create List window
//
var winList = Titanium.UI.createWindow({  
	title:'List',
    url:'windows/list.js',
	titleImage:'images/logo_small.png'
});
var tabList = Titanium.UI.createTab({
	icon:'images/tab_list.png',
    title:'List',
    window:winList
});

var actIndView = Ti.UI.createView({
	top:0,
	left:0,
	height:460,
	width:320,
	visible: true,
	zIndex: 99,
});
var actInd = Ti.UI.createActivityIndicator({
	top: 170,
	height: 35,
	width: 320,
	left: 0,
	style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	visible: true
});
actIndView.add(actInd);
winList.loader = actIndView;
winList.add(winList.loader);

//
// create Settings window
//
var winSettings = Titanium.UI.createWindow({ 
    title:'Settings',
    url:'windows/settings.js',
	titleImage:'images/logo_small.png'
});
var tabSettings = Titanium.UI.createTab({  
	icon:'images/tab_more.png',
    title:'More',
    window:winSettings
});

//
//  add tabs
//
tabGroup.addTab(tabSearch);  
tabGroup.addTab(tabList);  
tabGroup.addTab(tabSettings);

// open tab group
tabGroup.open();
