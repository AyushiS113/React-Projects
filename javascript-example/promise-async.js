$( document ).ready(function() {

	//callback makes syntax complex
 	let stocks = {
	    Fruits : ["strawberry", "grapes", "banana", "apple"],
	    liquid : ["water", "ice"],
	    holder : ["cone", "cup", "stick"],
	    toppings : ["chocolate", "peanuts"],
	 };
	let production = () =>{

	  	setTimeout(()=>{
		    console.log("production has started")
		    setTimeout(()=>{
		      console.log("The fruit has been chopped")
		      setTimeout(()=>{
		        console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} Added`)
		      },1000)
		    },2000)
		  },0);
	};
  	production();


  	console.log("******* promise js starts ******" );
	function myDisplayer(some) {
  		console.log(some);
	}

	let myPromise = new Promise(function(myresolve,myreject){
		let x= 0;
	 	setTimeout(() => {
            if(x == 0){
				myresolve("ok");
			}
			else{
				myreject("error");
			}
        }, 1000);
		
	//catch runs if reject is called
	}).catch(
		function test(){
			console.log("catch block");
		}
	//finally always runs
	).finally(
		function test2(){
			console.log("finally block");
		}
	);

	//then only contain resolve function
	myPromise.then(
		function(value){myDisplayer(value);},
	);   


 	console.log("******* async js starts ******" ); //async and await
 	async function foo(){
		const result1 = await new Promise((resolve) =>
			setTimeout(()=> {
				resolve("1");
		      	console.log("promise1 is done");
			},1000)
			);

		const result2 = await new Promise((resolve) =>
			setTimeout(()=> 
				{
					resolve("2");
					console.log("promise2 is done");

				},2000)
			);
	}
	foo();
});

