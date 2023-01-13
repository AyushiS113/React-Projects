$( document ).ready(function() {
	console.log("******* for in js starts******")
	//it returns key value pair
	const person = {
		  firstName: "John",
		  lastName: "Doe"
	};

	let alphabets = ["a","b","c"];
	for( x in person ){
		console.log(x);
		console.log(person[x]);

	}
	console.log("******* for of js starts******")
	// it only retuns values
	for( x of alphabets ){
		console.log(x);
	}

});