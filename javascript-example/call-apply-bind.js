$( document ).ready(function() {

	console.log("******* call,apply,bind function js starts ******" );
	function display(salary){
		return salary * 1000;
	}
	var emp1 = {
		name:"Ayushi",
		salary:5000
	}

	var emp2 = {
		name:"Riya",
		salary:4000
	}

	console.log(display.call(emp1,emp1.salary));
	console.log(display.call(emp2,emp2.salary));
	console.log(display.apply(emp2,[300]));

	//hard binding, now display method is bind to emp1 so we can not used for emp2
	const emp3 = display.bind(emp1);
	console.log(display(20));

});