$( document ).ready(function() {
	console.log("******* json example js starts ******" );

	//convert javascript object to string
	const arr = ["John", "Peter", "Sally", "Jane"];
	const myJSON = JSON.stringify(arr);
	console.log(typeof(myJSON));

	//convert text to javascript object 
	const arr2 = ["John", "Peter", "Sally", "Jane"];
	const myJSON2 = JSON.stringify(arr2);
	console.log(typeof(myJSON2));

});