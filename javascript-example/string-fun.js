$( document ).ready(function() {

	console.log("******* string fun js starts ******" );
	
	// it returns true if string exist otherwise return false
	//its case-sensitive
	let text = "Ayushi Shah";
	console.log(text.includes("Ayushi"));
	console.log(text.includes("Ayushi",12)); // second param is starting position
	console.log(text.includes("Ayu")); //true
	
	// return true or false
	//index starts with 0
	//also count space
	console.log(text.startsWith("Ayushi",1));//second param is starting position	
	console.log(text.startsWith("Shah",7));

	console.log(text.endsWith("Shah",7)); // second param is length of string where to check end string
	console.log(text.endsWith("Shah"));

	//it returns position of first string
	//if not match then returns -1
	//case sensitive
	//index starts with 0 
	console.log(text.search("u")); //it returns 2

	//it returns position of first string,if not match then returns -1
	//same as search but we can pass start position in it
	//case sensitive
	console.log(text.indexOf("h",9)); //it returns 2,start searching from left to right 

	console.log(text.lastIndexOf("h",1)); // start searching from right to left

	//returns length ,index starts with 1
	console.log(text.length);

	//retuns match string array, g for global, gi for global and case insencitive
	//we can also use expression
	// returns null if not found
	let text4 = "The rain in SPAIN stays mainly in the plain";
	console.log(text4.match("ain"));

	let text1 = "The rain in SPAIN stays mainly in the plain";
	console.log(text1.match(/ain/));

	let text2 = "The rain in SPAIN stays mainly in the plain";
	console.log(text2.match(/ain/g));

	let text3 = "The rain in SPAIN stays mainly in the plain";
	console.log(text3.match(/ain/gi));

	//it does not change the original string.
	//string.replace(search string,new value)
	//we can also use expression,g for global
	console.log(text3.replace(/in/g, "red"));

	//it returns character for specifies index,index starts with 0
	console.log(text3.charAt(0));

	//it returns asciicode
	console.log( text3.charCodeAt("T")); //returns asci code for "T"

	//it returns character from asci code
	console.log( String.fromCharCode(65)); 	

	console.log(text3.slice(1,2)); //h
	console.log(text3.substring(0,3)); //The
	console.log(text3.substr(1,4)); //he r

	text3.split(",") 

});