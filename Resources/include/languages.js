// Languages
var languages = [
	{code:'af', 	title:'Afrikaans',				short_title: 'Afrikaans' },
	{code:'sq', 	title:'Albanian',				short_title: 'Albanian'},
	{code:'ar', 	title:'Arabic',					short_title: 'Arabic'},
	{code:'eu', 	title:'Basque',					short_title: 'Basque'},
	{code:'be', 	title:'Belarusian',				short_title: 'Belarusian'},
	{code:'bg', 	title:'Bulgarian',				short_title: 'Bulgarian'},
	{code:'ca', 	title:'Catalan',				short_title: 'Catalan'},
//	{code:'zh-CN',	title:'Chinese Simplified',		short_title: 'Chinese S.'}, // NOT WORKING YET
//	{code:'zh-TW',	title:'Chinese Traditional',	short_title: 'Chinese T.'}, // NOT WORKING YET
	{code:'zh',		title:'Chinese',				short_title: 'Chinese'},
	{code:'hr',		title:'Croatian',				short_title: 'Croatian'},
	{code:'cs',		title:'Czech',					short_title: 'Czech'},
	{code:'da',		title:'Danish',					short_title: 'Danish'},
	{code:'nl',		title:'Dutch',					short_title: 'Dutch'},
	{code:'en',		title:'English',				short_title: 'English'},
	{code:'et',		title:'Estonian',				short_title: 'Estonian'},
	{code:'tl',		title:'Filipino',				short_title: 'Filipino'},
	{code:'fi',		title:'Finnish',				short_title: 'Finnish'},
	{code:'fr', 	title:'French',					short_title: 'French'},
	{code:'gl',		title:'Galician',				short_title: 'Galician'},
	{code:'de',		title:'German',					short_title: 'German'},
	{code:'el',		title:'Greek',					short_title: 'Greek'},
	{code:'ht',		title:'Haitian Creole',			short_title: 'Haitian'},
	{code:'iw',		title:'Hebrew',					short_title: 'Hebrew'},
	{code:'hi',		title:'Hindi',					short_title: 'Hindi'},
	{code:'hu',		title:'Hungarian',				short_title: 'Hungarian'},
	{code:'is',		title:'Icelandic',				short_title: 'Icelandic'},
	{code:'id',		title:'Indonesian',				short_title: 'Indonesian'},
	{code:'ga',		title:'Irish',					short_title: 'Irish'},
	{code:'it',		title:'Italian',				short_title: 'Italian'},
	{code:'ja',		title:'Japanese',				short_title: 'Japanese'},
	{code:'lv',		title:'Latvian',				short_title: 'Latvian'},
	{code:'lt',		title:'Lithuanian',				short_title: 'Lithuanian'},
	{code:'mk',		title:'Macedonian',				short_title: 'Macedonian'},
	{code:'ms',		title:'Malay',					short_title: 'Malay'},
	{code:'mt',		title:'Maltese',				short_title: 'Maltese'},
	{code:'no',		title:'Norwegian',				short_title: 'Norwegian'},
	{code:'fa',		title:'Persian',				short_title: 'Persian'},
	{code:'pl',		title:'Polish',					short_title: 'Polish'},
	{code:'pt',		title:'Portuguese',				short_title: 'Portuguese'},
	{code:'ro',		title:'Romanian',				short_title: 'Romanian'},
	{code:'ru',		title:'Russian',				short_title: 'Russian'},
	{code:'sr',		title:'Serbian',				short_title: 'Serbian'},
	{code:'sk',		title:'Slovak',					short_title: 'Slovak'},
	{code:'sl',		title:'Slovenian',				short_title: 'Slovenian'},
	{code:'es',		title:'Spanish',				short_title: 'Spanish'},
	{code:'sw',		title:'Swahili',				short_title: 'Swahili'},
	{code:'sv',		title:'Swedish',				short_title: 'Swedish'},
	{code:'th',		title:'Thai',					short_title: 'Thai'},
	{code:'tr',		title:'Turkish',				short_title: 'Turkish'},
	{code:'uk',		title:'Ukrainian',				short_title: 'Ukrainian'},
	{code:'vi',		title:'Vietnamese',				short_title: 'Vietnamese'},
	{code:'cy',		title:'Welsh',					short_title: 'Welsh'},
	{code:'yi',		title:'Yiddish',				short_title: 'Yiddish'}
];

function getLanguageIndexFromCode(code)
{
	num_languages = languages.length;
	for(var i=0; i<num_languages; i++){
		if(languages[i].code == code){
			return i;
		}
	}
	return null;
}
