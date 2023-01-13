$( document ).ready(function() {
	console.log("******* global methods js starts ******" );
	//global method does not need any variable or object to call method
	//it returns number from variable, spaces not allowed
	console.log(Number(true)); //1
	console.log(Number(false)); //0
	console.log(Number("1")); //1
	console.log(Number("test")); //NAN
	console.log(Number("1 2")); //NAN
	console.log(Number("1, 2")); //NAN

	//it parse a string and return whole string
	//spaces are  allowed, returns first number
	console.log(parseInt(true)); //NAN
	console.log(parseInt(false)); //NAN
	console.log(parseInt("10.33")); //10
	console.log(parseInt("-10.33")); //-10
	console.log(parseInt("10")); //10
	console.log(parseInt("10 20")); //10

	//it parse a string and return the number
	//spaces are  allowed, returns first number
	console.log(parseFloat("test")); //NAN
	console.log(parseFloat("10.5")); //10.5
	console.log(parseFloat("-10.33")); //-10.33
	console.log(parseFloat("10")); //10
	console.log(parseFloat("10 20")); //10

});