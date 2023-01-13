$( document ).ready(function() {

	console.log("******* array function js starts ******" );
	var colors = ["blue","pink","orange","brown","purple","yellow"];
	var fruits = ["apple","orange","mango","banana"];
	var numbers = [1, 2, 50, 4, 50, 6, 600,7, 8, 9, 10];
	var arr = [];
	//convert array to string
	console.log(colors.toString()) ;
	
	//convert array to string with separation parameter
	console.log(colors.join(".")) ;

	//remove last element from array and return deleted element
	console.log(colors.pop()) ;
	console.log(colors);

	//add elements to at the end of array and returns length
	console.log(colors.push("green","red")) ;

	//remove first element from array and return deleted element
	console.log(colors.shift()) ;

	//add elements to at the starting of array and returns length
	console.log(colors.unshift("balck","white")) ;
	console.log(colors.length);                                      

	//concate multiple arrays and returns new array	
	console.log(arr.concat(colors,fruits,numbers));	

	//first parameter is position where to add and delete element, second parameter describes how many elements to delete,return deleted elements

	console.log(fruits.splice(2,1,"watermelon","banana"));
	console.log(fruits);
	console.log(fruits.splice(1,1,"watermelon","banana"));
	console.log(fruits);
	console.log(fruits.splice(0,1));
	console.log(fruits);

	//it slice out a peice from array to new array from specifies position, it creates new array 
	//does not change original array
	//it ignores last position
	var new_colors = colors.slice(3);
	console.log("original arry",colors);
	console.log(new_colors);
	
	//you can also define starting and ending position to slice out piece, it does not consider last position
	var new_colors2 = colors.slice(1,4);
	console.log("original arry",new_colors2);
	console.log(colors);

	//calls function for every element of an array and returns new array
	//it does not change original array

	console.log(numbers.map(x => { if(x>2)
		return x * 2;
		
	}));
	console.log(numbers);

	//this method creates new array of elements that follows given criteria 
	//it does not change source array
	console.log(numbers.filter(number => number > 5));
	console.log(numbers);

	//it creates an iterator object with key value pair
	//it does not change original array
	for(const [index,value] of fruits.entries()){
		console.log(index + "=>"+ value);
	}

	//it returns true or false based on element in array
	console.log(fruits.includes("banana"));

	// it returns the first index of a given element
	console.log(fruits.indexOf("banana"));


	//it returns true if the function returns true for all elements.
	//it returns false if the function returns false for one element.
	//it does not change original array
	console.log(numbers);
	const isBelowThreshold = (currentValue) =>{
		return currentValue < 40;
	}
	console.log(numbers.every(isBelowThreshold));

	//array.fill(fill value,start pos,end pos)
	//it replaced original array
	//it ignores last position
	console.log(numbers.fill(3,2,5));

	//"Array.from()", returns array from string
	console.log(Array.from("asdfg"));

	//it returns the value of the first element that passes a test.
	//it does not change original array
	console.log(numbers.find(element => element > 5));

	const ages = [3, 10, 18, 20];

	console.log(ages.findIndex(checkAge));

	function checkAge(age) {
	  return age > 18;
	}
	//it creates new array from given arguments ,regardless type of arguments
	console.log(Array.of(1,2,3,"abc")); 

	//it runs reducer function for each element of an array and return "single value"
	//it does not change original array
	//array.reduce(function(total,currentValue.currentIndex,array),initial value)
	// if initial value is not given then it considers index 0 as initial value,
	//and iteration starts from next element 
	//if initial value is given then iteration starts from index 0]
	const initial_value = 0;
	const value = numbers.reduce((total,num)=> num + total,initial_value);
	console.log(value);

	//it works same as reduct except it performs operation from right to left
	console.log(numbers.reduceRight(myFunc));

	function myFunc(total, num) {
	  return total - num;
	} 

	//it tests whether at least one element in the array passes the test implemented by the provided function.
	//It returns true if any element from an array pass the test otherwise return false
	const even = (element) => element % 2 === 0;
	console.log(numbers.some(even));

	// sorts array according to first element
	console.log(numbers.sort());
	console.log(colors.sort());


	//returns array of keys
	const iterator = colors.keys();
	for( const x of iterator ){
		console.log(x);
	}
	const new_arr = ["a", , "c"];
	const sparseKeys = Object.keys(new_arr); //it ommits space
	const denseKeys = [...new_arr.keys()];
	console.log(sparseKeys); // ['0', '2']
	for( const x of denseKeys ){ // ['0','1', '2']
		console.log(x);
	}


});