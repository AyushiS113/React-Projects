$( document ).ready(function() {
	console.log("******* symbol js starts******");
	let id = Symbol("hii");
	let surname = Symbol();
	console.log(id);
	console.log(id.description);

	//alert(id.toString());
	const person = {
		name: "Ayushi",
		[surname] : "Shah",
	}
	person[id] = 1;
	console.log(person[id]);
	console.log(person[surname]);
	
	// symbols are ignores in for in loop
	for( x in person){
		console.log(x);
	}

	//global symbols
	let color = Symbol.for("blue");
	let color2 = Symbol.for("blue");
	console.log(color === color2);
	console.log(Symbol.keyFor(color));
 });  