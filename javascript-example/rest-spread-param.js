$( document ).ready(function() {

	console.log("******* spread param js starts ******" );
	const myVehicle = {
	  brand: 'Ford',
	  model: 'Mustang',
	  color: 'red'
	}

	const updateMyVehicle = {
	  type: 'car',
	  year: 2021, 
	  color: 'yellow'
	}

	//copy one object to another object
	const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
	console.log(myUpdatedVehicle);
	
	// while we copy object using spread operator it does not change original object or array
	const newVehicle = {...myVehicle};
	newVehicle.new = "test";
	console.log(newVehicle);
	console.log(myVehicle);

	//destrucring
	let numbers = [1,2,3,4,5];
	let [one,two,...rest] = numbers;
	console.log(one);
	console.log(two);
	console.log(rest);


	// normally used expand method
	let arr = ['a','b'];
	let arr2 = [arr,'c','d'];	
	console.log(arr2); // [ [ 'a', 'b' ], 'c', 'd' ]

	// expand using spread operator
  
	let a = ['a','b'];
	let a2 = [...a,'c','d'];
	  
	console.log(a2); // [ 'a', 'b', 'c', 'd' ]


	// min in an array using Math.min() will not work
	let b = [1,2,3,-1];
	console.log(Math.min(b)); //NaN
	//with spread operator it will work
	console.log(Math.min(...b));
	console.log("******* rest param js starts ******" );

	//converts elements to array
	function sum( ...args ){
		let total = 0;
		for( let arg of args){
			total+= arg;
		}
		return total;
	}
	console.log(sum(1,2,3,4));

	//just because of array yoy can use all array methods on it

	function display(a,b,...c){
		console.log(a);
		console.log(b);
		console.log(c);
		console.log(c.sort());
	}
	display(1,2,30,4,57,3);

	


});