var win = Ti.UI.currentWindow;

var actIndView = null;

// Includes
Ti.include('../include/db.js');
Ti.include('../include/languages.js');
Ti.include('../include/utils.js');

// Vertical Layout
var vLayout = Ti.UI.createView({
	height:'auto',
	layout:'vertical',
	top:0
});
win.add(vLayout);

// Global variables
var starred_previously_displayed = false;
function setStarredPreviouslyDisplayed(value){
	starred_previously_displayed = value;
}

// Header filters
var filters = Ti.UI.createView({
	height:45, 
	backgroundImage: '../images/filter_bg.png',
	top:0
});
vLayout.add(filters);

// TableView
var tableview = Titanium.UI.createTableView({
	deleteButtonTitle: 'Delete',
	top: 0,
	left:0,
	height: 325,
	backgroundColor: '#E0E0E0'
});
var tblFooterView = Ti.UI.createView({
  width: 320,
  height: 1,
  backgroundColor: '#E0E0E0'
});
tableview.footerView = tblFooterView;
tableview.addEventListener('scroll',function(e){return false;});

addFiltersInView(filters, tableview, reload_data, setStarredPreviouslyDisplayed);

var number_of_items_displayed = 0;

// load more feature
function add_load_more(retrieve_data)
{
	if(number_of_items_displayed < db_count_translations(retrieve_data)){
		load_more_button_displayed = true;
	    var moreRowLabel = Ti.UI.createLabel({
			font:{fontSize: 18, fontFamily:'Helvetica-Bold'},
			color:'000000',
			text: 'Load more...',
			left: 55,
			top: 16,
			height: 14
		});
		var actInd = Ti.UI.createActivityIndicator({
			top:5,
			height: 35,
			width: 50,
			left: 0,
			style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
			visible: false
		});
	    moreRow = Ti.UI.createTableViewRow();
		moreRow.add(actInd);
		moreRow.add(moreRowLabel);
		moreRow.next = number_of_items_displayed;
		moreRow.addEventListener('click', function(e){
			actInd.show();
			var more_translations = retrieve_data(true, e.row.next);
			tableview.deleteRow(e.index);
			for(var i=0; i<more_translations.length; i++){
				tableview.appendRow(translation_to_row(more_translations[i]),{animated:true});
			}
			number_of_items_displayed += more_translations.length;
			add_load_more(retrieve_data);
		});
		tableview.appendRow(moreRow);
	}
}

// reloads data
function reload_data(retrieve_data)
{	
	var translations = retrieve_data(true, 0);
	number_of_items_displayed = translations.length;

	var data = Array();

	for(var i=0; i<number_of_items_displayed; i++){
		data[i] = translation_to_row(translations[i]);
	}
	
	tableview.setData(data);
	
	var wrapper = filters.children[0];
	var on  = wrapper.children[1];
	var off = wrapper.children[2];
	on.status='visible';
	on.children[0].backgroundImage='../images/on.png';
	off.status='visible';
	off.children[0].backgroundImage='../images/on.png';
	
	// Load More feature
	add_load_more(retrieve_data);
}
// call it to initialize it
if(starred_previously_displayed){
	reload_data(db_get_starred_translations);
}else{
	reload_data(db_get_translations);
}
// add tableview to window
vLayout.add(tableview);

/*
* When window is in focus
*/
win.addEventListener('focus', function(){
	if(starred_previously_displayed){
		reload_data(db_get_starred_translations);
	}else{
		reload_data(db_get_translations);
	}
});

/*
* Edit mode
*/

var edit = Ti.UI.createButton({
	title: 'Edit'
});
edit.addEventListener('click', function(){
	win.setRightNavButton(done);
	tableview.deleteRow(number_of_items_displayed); // supression de "Load more"
	tableview.editing = true;
});

var done = Ti.UI.createButton({
	title: 'Done',
	style: Ti.UI.iPhone.SystemButtonStyle.DONE
});
done.addEventListener('click', function(){
	win.setRightNavButton(edit);
	if(starred_previously_displayed){ // on réajoute le "Load More"
		add_load_more(db_get_starred_translations);
	}else{
		add_load_more(db_get_translations);
	}
	tableview.editing = false;
});

win.setRightNavButton(edit);

// actually delete
tableview.addEventListener('delete', function(e){
	db_delete_translation(e.row.translation_id);
});

if(win.loader != null){
	win.loader.hide();
	win.loader = null;	
}
