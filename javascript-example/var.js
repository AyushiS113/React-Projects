$( document ).ready(function() {

	console.log("******* var js starts ******" );
	var a= 10;
	let b = 30;

	function test(){
		a =20;
		let b = 50; 
		const c= 20;
		console.log(a); //20  
		console.log(b); //50
		console.log(c);//20
	}
	test();
	console.log(a); //20
	//console.log(b); //gives error
	console.log(b); // 40
	//console.log(c);//gives error

});