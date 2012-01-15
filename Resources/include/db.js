Ti.include('../include/Translation.js');
Ti.include('../include/LanguagePreferences.js');

// Creates DB
var DB_NAME = 'lalali';
var NB_TRANSLATIONS_PER_PAGE = 15;

function db_init()
{
	var db = Titanium.Database.open(DB_NAME);

	db.execute('CREATE TABLE IF NOT EXISTS TRANSLATION (ID INTEGER PRIMARY KEY AUTOINCREMENT, TEXT_FROM TEXT, TEXT_TO TEXT, LANG_FROM TEXT, lANG_TO TEXT, STARRED INTEGER, CREATED_AT INTEGER)');
	db.execute('CREATE TABLE IF NOT EXISTS LANG_PREF (ID INTEGER PRIMARY KEY AUTOINCREMENT, LANG_FROM TEXT, LANG_TO TEXT)');

	var rows = db.execute('SELECT * FROM LANG_PREF');
	var count = rows.getRowCount();
	rows.close();
	if(count==0){
		db.execute('INSERT INTO LANG_PREF (LANG_FROM, LANG_TO) VALUES ("fr","en")');
	}
	db.close();
}

/* Accessors Language preferences */

function db_change_language_from_preferences(lang_from)
{
	var db = Titanium.Database.open(DB_NAME);
	var rows = db.execute('SELECT * FROM LANG_PREF');
	while(rows.isValidRow()){
		query = 'UPDATE LANG_PREF SET LANG_FROM = ?';
		db.execute(query, lang_from);
		rows.next();
	}
	rows.close();
	db.close();
}
function db_change_language_to_preferences(lang_to)
{
	var db = Titanium.Database.open(DB_NAME);
	var rows = db.execute('SELECT * FROM LANG_PREF');
	while(rows.isValidRow()){
		query = 'UPDATE LANG_PREF SET LANG_TO = ?';
		db.execute(query, lang_to);
		rows.next();
	}
	rows.close();
	db.close();
}

function db_get_language_preferences()
{
	var db = Titanium.Database.open(DB_NAME);
	var rows = db.execute('SELECT * FROM LANG_PREF');
	var language_preferences = null;
	while(rows.isValidRow()){
		language_preferences = new LanguagePreferences();
		language_preferences.lang_from = rows.fieldByName('lang_from');
		language_preferences.lang_to   = rows.fieldByName('lang_to');
		rows.next();
	}
	rows.close();
	db.close();
	return language_preferences;
}

/* Add translation */

function db_add_translation (translation)
{	
	var db = Titanium.Database.open(DB_NAME);
	var date = new Date();
	var now = date.getTime();
	var sql_starred = translation.starred?1:0;
	
	// First check if not already in database
	var rows = db.execute('SELECT ID FROM TRANSLATION WHERE TEXT_FROM = ? AND LANG_FROM = ? AND LANG_TO = ?', translation.text_from, translation.lang_from, translation.lang_to);
	if(rows.getRowCount() > 0){ // if already exists, update it
		$query = 'UPDATE TRANSLATION SET CREATED_AT = ? WHERE TEXT_FROM = ?';
		db.execute($query, now, translation.text_from);
	}else{ // else, add it
		$query = 'INSERT INTO TRANSLATION (TEXT_FROM, TEXT_TO, LANG_FROM, LANG_TO, STARRED, CREATED_AT)'+
				 'VALUES(?,?,?,?,?,?)';
		db.execute($query, translation.text_from, translation.text_to, translation.lang_from, translation.lang_to, sql_starred, now);
	}
	rows.close();
	db.close();
}

/* Get all translations */

function db_get_translations(is_limited, start)
{	
	var query = 'SELECT * FROM TRANSLATION ORDER BY CREATED_AT DESC';
	if(is_limited){
		query +=' LIMIT '+start+','+NB_TRANSLATIONS_PER_PAGE;
	}
	
	return doRetrieveTranslationsFromQuery(query);
}

/* Get starred translations */

function db_get_starred_translations(is_limited, start)
{
	var query = 'SELECT * FROM TRANSLATION WHERE STARRED=1 ORDER BY CREATED_AT DESC';
	if(is_limited){
		query +=' LIMIT '+start+','+NB_TRANSLATIONS_PER_PAGE;
	}
	
	return doRetrieveTranslationsFromQuery(query);
}

function doRetrieveTranslationsFromQuery(query)
{
	var result = Array();
	var db = Titanium.Database.open(DB_NAME);
	var rows = db.execute(query);
	while(rows.isValidRow()){
		var translation 		= new Translation();
		translation.id 			= rows.fieldByName('id');
		translation.text_from 	= rows.fieldByName('text_from');
		translation.text_to 	= rows.fieldByName('text_to');
		translation.lang_from 	= rows.fieldByName('lang_from');
		translation.lang_to 	= rows.fieldByName('lang_to');
		translation.starred 	= (rows.fieldByName('starred')==0)?false:true;
		translation.created_at 	= rows.fieldByName('created_at');
		result.push(translation);
		rows.next();
	}
	rows.close();
	db.close();
	return result;
}

/* Delete translation */

function db_delete_translation(translation_id)
{
	var db = Titanium.Database.open(DB_NAME);
	
	db.execute('DELETE FROM TRANSLATION WHERE ID = ?', translation_id);
	
	db.close();
}

/* Gets number of translations per page */

function db_count_translations(retrieve_function)
{
	/*var db = Titanium.Database.open(DB_NAME);
	
	var rows = db.execute('SELECT COUNT(*) AS count FROM TRANSLATION');
	
	var count;
	while(rows.isValidRow()){
		count = rows.fieldByName('count');
		rows.next();
	}
	rows.close();
	db.close();*/
	results = retrieve_function(false, 0);
	return results.length;
}

/*
* Star/Unstar translation
*/

function db_unstar_translation(translation_id)
{
	var db = Titanium.Database.open(DB_NAME);
	var query = 'UPDATE TRANSLATION SET STARRED = ? WHERE ID = ?';
	db.execute(query, 0, translation_id);
	db.close();
}

function db_star_translation(translation_id)
{
	var db = Titanium.Database.open(DB_NAME);
	var query = 'UPDATE TRANSLATION SET STARRED = ? WHERE ID = ?';
	db.execute(query, 1, translation_id);
	db.close();
}
