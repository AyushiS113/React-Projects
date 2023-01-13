$( document ).ready(function() {

	console.log("******* set object js starts ******" );
	let text = "";
	let text2 = "";
	let letters = new Set(["a","b","c"]); 
	
	letters.add("d");

	letters.forEach (function(value) {
	  text += value;
	});
	console.log(text);

	for (const entry of letters) {
	  text2 += entry;
	}
	console.log(text2);

});