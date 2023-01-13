$( document ).ready(function() {
	console.log("******* number methods js starts ******" );

	//it converts a number to a string. 
	console.log((123).toString());
	console.log((10 + 23).toString());

	//it returns the string with number rounded and writing with exponential notation
	const x = 7.567;
	console.log(x.toExponential()); //7.567e+0
	console.log(x.toExponential(2)); //7.57e+0
	console.log(x.toExponential(4)); //7.5670e+0
	console.log(x.toExponential(6)); //7.567000e+0

	//it returns string with a number rounded written with the specified number of decimal
	console.log(x.toFixed(0)); //7.567
	console.log(x.toFixed(2)); //7.57
	console.log(x.toFixed(3)); //7.567
	console.log(x.toFixed(4)); //7.5670

	//it return the string, with a number rounded written with specified length

	console.log(x.toPrecision(1)); //8
	console.log(x.toPrecision(2)); //7.6
	console.log(x.toPrecision(3)); //7.57
	console.log(x.toPrecision(4))  //7.567

	//it returns number as number
	console.log((123).valueOf());
	console.log((10 + 23).valueOf());

	console.log(parseInt("-10")); //-10
  	console.log(parseInt("-10.33")); //-10
  	console.log(parseInt("10") ); //10
  	console.log(parseInt("10.33") ); //10
  	console.log(parseInt("10 6") );  //10
  	console.log(parseInt("10 years") );  //10
  	console.log(parseInt("years 10"));  //NAN


  	console.log(parseFloat("10.33") ); //10.33
  	console.log(parseFloat("10 6") );  //10
  	console.log(parseFloat("10 years") );  //10
  	console.log(parseFloat("years 10"));  //NAN

  	console.log(Number("10  ")); //10
	console.log(Number(" 10  ")); //10
	console.log(Number("10.33")); //10.33
	console.log(Number("10,33")); //NAN
	console.log(Number("10 33")); //NAN
	console.log(Number("John")); //NAN

});	
