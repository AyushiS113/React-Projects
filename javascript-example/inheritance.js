$( document ).ready(function() {

	console.log("******* inheritance js starts ******" );
	class A{
		constructor(name,age){
			this.name = name;
			this.age = age;
		}
		display(){
			console.log(this.name + " "+ this.age);
		}
	}

	class B extends A { 
		constructor(name,age,female){
			super(name,age);
			this.female = female;
		}
		display2(){
			console.log(this.female);
		}

      	// This function is called when the object is destroyed
		destructor() {
     		console.log(this.name + "is destroyed");
   		}

	}
	let b = new B("Ayushi",25, "female");
	b.display();
	b.display2();
});