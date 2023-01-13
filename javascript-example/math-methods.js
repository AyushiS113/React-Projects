$( document ).ready(function() {
	console.log("******* math methods js starts ******" );
	
	//returns nearest integer number
	console.log(Math.round(5.5)); //6
	console.log(Math.round(5.9)); //6
	console.log(Math.round(5.4)); //5

	//returns the value of x rounded up to its nearest integer
	console.log(Math.ceil(5.5)); //6
	console.log(Math.ceil(5.9)); //6
	console.log(Math.ceil(5.4)); //6

	//returns the value of x rounded down to its nearest integer
	console.log(Math.floor(5.5)); //5
	console.log(Math.floor(5.9)); //5
	console.log(Math.floor(5.4)); //5

	//returns the integer part of x
	console.log(Math.trunc(7.5));
	console.log(Math.trunc(8.9));
	console.log(Math.trunc(9.4));	

	//returns the x is positive, negative or null
	console.log(Math.sign(7.5));
	console.log(Math.sign(-8.9));
	console.log(Math.sign(0));

	//returns the value of x to the power of y
	console.log(Math.pow(2,3));	

	//returns the value of x to the square root of y
	console.log(Math.sqrt(64));	//8*8

	//returns the positive value of x
	console.log(Math.abs(64));	
	console.log(Math.abs(-64));	

	//returns the minimum value
	console.log(Math.min(64,3,5));

	//returns the maximum value
	console.log(Math.max(64,3,5));

	//returns the random value
	console.log(Math.random());	

});