$( document ).ready(function() {
	console.log("******* arrow js starts ******" );

	display = () => {
		console.log("hello");
	}
	display();


	hello = () => {
	  document.getElementById("demo").innerHTML += this;
	}

	// The window object calls the function:
	window.addEventListener("load", hello);

	// A button object calls the function:
	document.getElementById("btn").addEventListener("click", hello);
});