$( document ).ready(function() {

	console.log("******* default param js starts ******" );
	function abc(x=2){
		return (x*2	);
	}
	console.log(abc());

	//default parameter must follow left to right
	function display(x=2,y){
		return x*y;
	}
	console.log(display()); // gives undefined
	console.log(display(4)); // it also gives undefined, it overwrites x value

	//earlier parameter used for later parameters
	function show(x=2,y=`${x}`){
		return x*y;
	}
	console.log(show());
});