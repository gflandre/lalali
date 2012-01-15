Ti.include('../include/db.js');
Ti.include('../include/languages.js');

var context = 'FROM';

db_init();
var language_preferences = db_get_language_preferences();
var selected_language_from = getLanguageIndexFromCode(language_preferences.lang_from);
var selected_language_to = getLanguageIndexFromCode(language_preferences.lang_to);

var value_from = '';

// Vertical Layout
var vLayout = Ti.UI.createView({
	height:'auto',
	layout:'vertical',
	top:0
});
Ti.UI.currentWindow.add(vLayout);

// Logo
var logo = Ti.UI.createView({
	width: 127,
	height: 54,
	top: 27,
	backgroundImage: '../images/logo_big.png'
});
vLayout.add(logo);

// "translate" text
var translateLabel = Ti.UI.createLabel({
	top:15,
	text:'translate',
	font:{fontSize: 20, fontFamily:'Helvetica'},
	color:'#B5B5B5',
	textAlign:'left',
	left:15,
	height:'auto',
	width: 'auto'
});
vLayout.add(translateLabel);

// Textfield
var textFieldSearch = Titanium.UI.createTextField({
    color:'#000',
	font:{fontSize: 38, fontFamily:'Helvetica'},
	height: 51,
    top:15,
    width:290,
	left:15,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	backgroundImage:'../images/textfield.png',
	paddingLeft:10
});
vLayout.add(textFieldSearch);

// Horizontal Layout
var hLayout = Ti.UI.createView({
	top:15,
	left:15,
	height:'auto',
	width:'auto',
	layout:'horizontal'
});
vLayout.add(hLayout);

// label "from" text
var fromLabel = Ti.UI.createLabel({
	text:'from',
	font:{fontSize: 20, fontFamily:'Helvetica'},
	color:'#B5B5B5',
	textAlign: 'left',
	height:'auto',
	width: 'auto',
	top: 2,
	left:0
});
hLayout.add(fromLabel);

// Label language from
var labelFrom = Titanium.UI.createLabel({
	color:'#3976a5',
	text:languages[selected_language_from].short_title,
	font:{fontSize:21,fontFamily:'Helvetica'},
	textAlign:'left',
	width:'auto',
	height: 'auto',
	left:5
});
hLayout.add(labelFrom);

// label "to" text
var toLabel = Ti.UI.createLabel({
	text:'to',
	font:{fontSize: 20, fontFamily:'Helvetica'},
	color:'#B5B5B5',
	textAlign: 'left',
	height:'auto',
	width: 'auto',
	top: 2,
	left:5
});
hLayout.add(toLabel);

var labelTo = Titanium.UI.createLabel({
	color:'#3976a5',
	text:languages[selected_language_to].short_title,
	font:{fontSize:21,fontFamily:'Helvetica'},
	textAlign:'left',
	width:'auto',
	height: 'auto',
	left:5
});
hLayout.add(labelTo);

//background view
var bgChange = Ti.UI.createView({
	width: 320,
	height:43,
	top:24,
	backgroundColor:'#E4E4E4',
	backgroundGradient: {type:'linear',
						colors:['#CCCCCC','#CCCCCC'],
						startPoint:{x:0,y:22},
						endPoint:{x:0,y:43}}
});
vLayout.add(bgChange);

// ok button
var okButton = Ti.UI.createButton({
  	width:288,
	height:43,
	top:0,
	backgroundImage:'../images/ok_button_off.png',
	backgroundSelectedImage:'../images/ok_button_on.png'
});
bgChange.add(okButton);

// Result area displays the translated text
var resultArea = Ti.UI.createView({
	backgroundColor:'#CCCCCC',
	top:0,
	width: 320,
	height:150
});
vLayout.add(resultArea);

var resultLayout = Ti.UI.createLabel({
	layout:'horizontal',
	top:20
});
resultArea.add(resultLayout);

var imgResult = Ti.UI.createView({
	backgroundImage: '../images/arrow.png',
	width:7,
	height:15,
	left:15,
	top:19,
	visible: false
});
resultLayout.add(imgResult);

var scrollView = Ti.UI.createScrollView({
	contentWidth: 266,
	contentHeight: 'auto',
	bottom:10,
	left:30,
	width: 266,
	height: 90,
	showVerticalScrollIndicator: true,
	showHorizontalScrollIndicator: false
});
var labelResult = Ti.UI.createLabel({
	color:'#000',
	font:{fontSize: 38, fontFamily:'Helvetica'},
	textAlign:'left',
	top: 0,
	left: 0,
	height:'auto',
	width: 266
});
scrollView.add(labelResult);
Ti.UI.currentWindow.add(scrollView);

var actInd = Ti.UI.createActivityIndicator({
	bottom: 45,
	height: 35,
	width: 266,
	left: 30,
	style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	visible: false
});
Ti.UI.currentWindow.add(actInd);

//
// Picker view
//
var pickerView = Titanium.UI.createView({
	backgroundColor: '#000',
	bottom: -260,
	height: 260
});

// Picker search for language selection
var pickerSearch = Titanium.UI.createPicker({
	bottom: 0
});
pickerSearch.selectionIndicator=true;
pickerSearch.add(languages);
pickerSearch.addEventListener('change', function(e){
	if(context=='FROM'){
		selected_language_from = e.rowIndex;
	}else if(context == 'TO'){
		selected_language_to = e.rowIndex;
	}
});
pickerView.add(pickerSearch);

// Toolbar and OK button
var pickerButton = Ti.UI.createButton({
	title: 'OK',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
pickerButton.addEventListener('click', function(e){
	if(context == 'FROM'){
		labelFrom.text = languages[selected_language_from].short_title;
		db_change_language_from_preferences(languages[selected_language_from].code);
	}else if(context == 'TO'){
		labelTo.text = languages[selected_language_to].short_title;
		db_change_language_to_preferences(languages[selected_language_to].code);
	}
	animatePickerViewHide();
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var pickerToolbar = Ti.UI.createToolbar({
	items:[flexSpace,pickerButton],
	top:0,
	height:40,
	barColor:'#000'
});

pickerView.add(pickerToolbar);

Titanium.UI.currentWindow.add(pickerView);

// Picker search events
labelFrom.addEventListener('singletap', function(){
	textFieldSearch.blur();
	context = 'FROM';
	pickerSearch.setSelectedRow(0, selected_language_from, false);
	animatePickerViewShow();
});

labelTo.addEventListener('singletap', function(){
	textFieldSearch.blur();
	context = 'TO';
	pickerSearch.setSelectedRow(0, selected_language_to, false);
	animatePickerViewShow();
});

function animatePickerViewShow(){
	var anim = Titanium.UI.createAnimation();
	anim.bottom = 0;
	anim.duration = 200;
	pickerView.animate(anim);
}
function animatePickerViewHide(){
	var anim = Titanium.UI.createAnimation();
	anim.bottom = -260;
	anim.duration = 200;
	pickerView.animate(anim);
}

// Translation

var error_messages = [
	"Oh no, lalali can't connect to the Internet.\nTry again when you get out that cave!",
	"The Internet gods are mad for some reason.\nTry again later once a router has been sacrificed...",
	"The Internet elves seem to be on strike.\nTry again when they finally get those cookies they're asking for",
	"Oh no, lalali can't connect to the Internet.\nTry again when you're near any form of civilization"
];

var connectionErrorAlert = Titanium.UI.createAlertDialog({
	title:"o_o'"
});

var xhr = Ti.Network.createHTTPClient();
xhr.setTimeout(0);

var onloadInterval = setInterval(function(){
            if(xhr.readyState == 4){
                clearInterval(onloadInterval);
            }
        },5000);

xhr.onError = function()
{
	actInd.hide();
	connectionErrorAlert.message = error_messages[Math.floor( Math.random() * error_messages.length )]; // Random error message
	connectionErrorAlert.show();
	setTimeout(function(){
		connectionErrorAlert.hide();
	},3000);
}

xhr.onreadystatechange = function()
{
	if(this.readyState == this.UNSENT){
		actInd.hide();
		connectionErrorAlert.message = error_messages[Math.floor( Math.random() * error_messages.length )]; // Random error message
		connectionErrorAlert.show();
		setTimeout(function(){
			connectionErrorAlert.hide();
		},3000);
	}
}

xhr.onload = function()
{
	if(this.status == 308){ // timeout
		actInd.hide();
		connectionErrorAlert.message = error_messages[Math.floor( Math.random() * error_messages.length )]; // Random error message
		connectionErrorAlert.show();
		setTimeout(function(){
			connectionErrorAlert.hide();
		},3000);
	}else{
		if(this.status == 200){
			var result = JSON.parse(this.responseText, function(k,v){return v;});
			
			var translated_word = result.data.translations[0].translatedText;
			//Ti.API.info(translated_word);
			translated_word = translated_word.replace(/&#39;/i,"’");
			//Ti.API.info(translated_word);
			labelResult.text = translated_word;
		
			var translation = new Translation();
			translation.text_from = value_from;
			translation.text_to = labelResult.text;
			translation.lang_from = languages[selected_language_from].code;
			translation.lang_to = languages[selected_language_to].code;
			translation.starred = false;
		
			db_add_translation(translation);
				
			textFieldSearch.value = '';
			
			imgResult.show();
			scrollView.show();
			resultLayout.show();
			actInd.hide();
			
		}else{
			connectionErrorAlert.message = "There's a translation problem, my bad :("; // Error message
			connectionErrorAlert.show();
			setTimeout(function(){
				connectionErrorAlert.hide();
			},3000);
		}
	}
};

okButton.addEventListener('click', function(){
	if(textFieldSearch.value != ""){
		
		if(selected_language_from!=selected_language_to){
		
			if(Ti.Network.online){
		
				value_from = textFieldSearch.value;
				lang_from = languages[selected_language_from].code;
				lang_to = languages[selected_language_to].code;
	
				textFieldSearch.blur();
	
				// Actually translates the text
			// API V1 : deprecated
/*				var url = 'http://ajax.googleapis.com/ajax/services/language/translate?v='+encodeURIComponent('1.0')
						 +'&q='+value_from.replace(' ','%20')
					     +'&langpair='+encodeURIComponent(lang_from)+'|'+encodeURIComponent(lang_to);*/
			// API V2
				var url = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyBS8i-cEV5ONBWrJJ4to2rRv8wxyQinqsU'+
						  '&q='+value_from+
						  '&source='+encodeURIComponent(lang_from)+
						  '&target='+encodeURIComponent(lang_to);
				xhr.open('GET', url);
				//Ti.API.info(url);
				xhr.send();
		
				scrollView.hide();
				resultLayout.hide();
				actInd.show();
	
			}else{
	
				connectionErrorAlert.message = error_messages[Math.floor( Math.random() * error_messages.length )]; // Random error message
				connectionErrorAlert.show();
				setTimeout(function(){
					connectionErrorAlert.hide();
				},3000);
	
			}
		
		}else{
			connectionErrorAlert.message = "It's the same language, no need to translate anything!"; // Error message
			connectionErrorAlert.show();
			setTimeout(function(){
				connectionErrorAlert.hide();
			},3000);
		}	
	
	}else{
		
		connectionErrorAlert.message = "Oops, you didn't enter a word to translate!"; // Random error message
		connectionErrorAlert.show();
		setTimeout(function(){
			connectionErrorAlert.hide();
		},3000);
		
	}
});

