$( document ).ready(function() {
	console.log("******* object entries js starts ******" );
	//it returns key,value pair of array from object
	const obj1 = {
		name: "Ayushi",
		surname: "Shah"
	}
	const array = ["laher","shah"];
	for( const [key,value] of Object.entries(array)){
		console.log( `${key}:${value}`);
	}
	for( const [key,value] of Object.entries(obj1)){
		console.log( `${key}:${value}`);
	}

	//it returns keys from object
	for( const key of Object.keys(obj1)){
		console.log( `${key}`);
	}

	//it returns value from object
	for( const value of Object.values(obj1)){
		console.log( `${value}`);
	}

});