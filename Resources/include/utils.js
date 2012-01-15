Ti.include('../include/db.js');

// From a Translation object to a TableViewRow
function translation_to_row(translation)
{
	var row = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor: '#E0E0E0',
		width: 320,
		height:'auto',
	});
	row.translation_id = translation.id;
	row.addEventListener('click',function(e){return false;});
	
	var rowWrapper = Ti.UI.createView({
		top:0,
		left: 0,
		width: 320
	});
	
	var starredImage = Ti.UI.createView({
		left: 14,
		top: 12,
		width: 22,
		height:22,
		backgroundImage: translation.starred?'../images/starred_on.png':'../images/starred_off.png',
		viewType: 'image'
	});
	var starred = Ti.UI.createView({
		left: 0,
		top: 0,
		width: 50,
		height: 'auto',
		status: translation.starred?"on":"off",
		viewType: 'view'
	});
	starred.translation_id = translation.id;
	
	starred.addEventListener('click', function(e){
		var obj = e.source;
		if(obj.viewType == 'image'){
			starred.fireEvent('click');
		}else{
			if(obj.status=="on"){
				db_unstar_translation(obj.translation_id);
				starredImage.backgroundImage = '../images/starred_off.png';
				obj.status = "off";
			}else{
				db_star_translation(obj.translation_id);
				starredImage.backgroundImage = '../images/starred_on.png';
				obj.status = "on";
			}
		}
	});
	starred.add(starredImage);
	rowWrapper.add(starred);
	
	var country_code_from_label = Ti.UI.createLabel({
		text: translation.lang_from.toUpperCase(),
		font:{fontSize: 10, fontFamily:'Helvetica-Bold'},
		color:'a8afb5',
		height: 10,
		widt: 125,
		top: 5,
		left: 55
	});
	var translation_from_label = Ti.UI.createLabel({
		text: translation.text_from,
		originalText: translation.text_from,
		temp: '',
		font:{fontSize: 18, fontFamily:'Helvetica-Bold'},
		color:'c25454',
		top: 16,
		height: 'auto',
		width: 125,
		left: 55,
		paddingBottom: 15,
		visible: true
	});
	
	var text_from = Ti.UI.createView({
		left: 55,
		top: 0,
		width: 125,
		height:16+translation_from_label.size.height+15,
		zIndex: 99999
	});
	
	rowWrapper.add(country_code_from_label);
	rowWrapper.add(translation_from_label);
	rowWrapper.add(text_from);
	
	var country_code_to_label = Ti.UI.createLabel({
		text: translation.lang_to.toUpperCase(),
		font:{fontSize: 10, fontFamily:'Helvetica-Bold'},
		color:'a8afb5',
		height: 10,
		top: 5,
		left: 190
	});

	var translation_to_label = Ti.UI.createLabel({
		text: translation.text_to,
		originalText: translation.text_to,
		temp: '',
		font:{fontSize: 18, fontFamily:'Helvetica-Bold'},
		color:'306fa1',
		top: 16,
		height: 'auto',
		width: 125,
		left: 190,
		paddingBottom: 15,
		visible: true
	});
		
	var text_to = Ti.UI.createView({
		left: 185,
		top: 0,
		width: 125,
		height:16+translation_to_label.size.height+15,
		zIndex: 99999
	});
	
	rowWrapper.add(country_code_to_label);
	rowWrapper.add(translation_to_label);
	rowWrapper.add(text_to);
	
	var separator = Ti.UI.createView({
		height: 3,
		width: 320,
		backgroundImage: '../images/row_bg.png',
		bottom:0
	});
	rowWrapper.add(separator);
	
	if (16+translation_to_label.size.height+15 < 50 && 16+translation_to_label.size.height+15 < 50){
		rowWrapper.height = 50;
	}else{
		if(translation_to_label.size.height > translation_from_label.size.height){
			rowWrapper.height = translation_to_label.size.height+10+15;
		}else{
			rowWrapper.height = translation_from_label.size.height+10+15;
		}
	}
	row.add(rowWrapper);
	
	// Events
	text_from.addEventListener('click', function(e){
		if(!translation_from_label.visible){
			translation_from_label.visible = true;
		}else{
			translation_from_label.visible = false;
			if(!translation_to_label.visible){
				translation_to_label.visible = true;
			}
		}
	});
	
	text_to.addEventListener('click', function(e){
		if(!translation_to_label.visible){
			translation_to_label.visible = true;
		}else{
			translation_to_label.visible = false;
			if(!translation_from_label.visible){
				translation_from_label.visible = true;
			}
		}
	});
	
	return row;
}

// Hide all the left translations of the tableview
function hideAllLabelIndex(tableview, labelIndex){
	var sections = tableview.data;
	for(var i=0; i<sections.length; i++){
		var section = sections[i];
		for(var j=0; j<section.rowCount; j++){
			var row = section.rows[j];
			if(row.children){
				var wrapper = row.children[0];
				if(wrapper.children){
					index = (labelIndex == 1)?2:5;
					var label = wrapper.children[index]; // translation text
					label.hide();
				}
			}
		}
	}
}

function showAllLabelIndex(tableview, labelIndex){
	var sections = tableview.data;
	for(var i=0; i<sections.length; i++){
		var section = sections[i];
		for(var j=0; j<section.rowCount; j++){
			var row = section.rows[j];
			if(row.children){
				var wrapper = row.children[0];
				if(wrapper.children){
					index = (labelIndex == 1)?2:5;
					var label = wrapper.children[index]; // translation text
					label.show();
				}
			}
		}
	}
}

// Add the filter toolbar in view
function addFiltersInView(view, tableview, reload_function, setStarredPreviouslyDisplayed)
{
	var hLayout = Ti.UI.createView({
		top:0,
		height: 45,
		width: 320,
		layout:'horizontal'
	});
	var starredImage = Ti.UI.createView({
		left: 14,
		top: 12,
		width: 22,
		height:22,
		backgroundImage:'../images/starred_off.png',
		type: 'image'
	});
	var starred = Ti.UI.createView({
		left: 0,
		top: 0,
		width: 50,
		height:45,
		status: "off",
		type: 'view'
	});
	starred.add(starredImage);
	hLayout.add(starred);
	
	var hideFromImage = Ti.UI.createView({
		left: 49,
		top: 14,
		width: 35,
		height:17,
		backgroundImage:'../images/on.png'
	});
	var hide_from = Ti.UI.createView({
		left: 0,
		top: 0,
		width: 133,
		height:45,
		status: 'visible'
	});
	hide_from.add(hideFromImage);
	hLayout.add(hide_from);

	var hideToImage = Ti.UI.createView({
		left: 49,
		top: 14,
		width: 35,
		height:17,
		backgroundImage:'../images/on.png'
	});
	var hide_to = Ti.UI.createView({
		left: 0,
		top: 0,
		width: 133,
		height: 45,
		status: 'visible'
	});
	hide_to.add(hideToImage);
	hLayout.add(hide_to);
	
	view.add(hLayout);
	
	// Events
	starred.addEventListener('click', function(e){
		var obj = e.source;
		if(obj.type == 'image'){
			starred.fireEvent('click');
		}else{
			if(obj.status=='on'){ // Show every translation
				reload_function(db_get_translations);
				setStarredPreviouslyDisplayed(false);
				starredImage.backgroundImage = '../images/starred_off.png';
				obj.status = 'off';
			}else{	// Show only starred
				reload_function(db_get_starred_translations);
				setStarredPreviouslyDisplayed(true);
				starredImage.backgroundImage = '../images/starred_on.png';
				obj.status = 'on';
			}
			hideFromImage.backgroundImage = '../images/on.png';
			hide_from.status = 'visible';
			hideToImage.backgroundImage = '../images/on.png';
			hide_to.status = 'visible';
		}
	});
	
	hide_from.addEventListener('click', function(e){
		if(hide_from.status=='hidden'){
			hideFromImage.backgroundImage = '../images/on.png';
			showAllLabelIndex(tableview, 1); // left
			hide_from.status = 'visible';
		}else{
			hideFromImage.backgroundImage = '../images/off.png';
			hideAllLabelIndex(tableview, 1); // left
			hide_from.status = 'hidden';
			if(hide_to.status=='hidden'){
				hideToImage.backgroundImage = '../images/on.png';
				showAllLabelIndex(tableview, 2); // right
				hide_to.status = 'visible';
			}
		}
	});
	
	hide_to.addEventListener('click', function(e){
		if(hide_to.status=='hidden'){
			hideToImage.backgroundImage = '../images/on.png';
			showAllLabelIndex(tableview, 2); // right
			hide_to.status = 'visible';
		}else{
			hideToImage.backgroundImage = '../images/off.png';
			hideAllLabelIndex(tableview, 2); // right
			hide_to.status = 'hidden';
			if(hide_from.status=='hidden'){
				hideFromImage.backgroundImage = '../images/on.png';
				showAllLabelIndex(tableview, 1); // left
				hide_from.status = 'visible';
			}
		}
	});
}

function count_all_rows_in_tableview(tableview)
{
	var count = 0;
	for(var i=0; i<tableview.data.length; i++){
		count += tableview.data[i].rowCount;
	}
	return count;
}
