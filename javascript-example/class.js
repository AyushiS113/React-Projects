$( document ).ready(function() {

	console.log("******* class js starts ******" );
	class Person{
		//it is used to initialized class propertis
		constructor(name,age){
			this.name = name;
			this.age = age;
		}

		display(name,age){
			console.log("name:" +  this.name + " age:" + this.age);
		}
	}
	// objects are used to access class properties and methods
	let p = new Person("Ayushi",25);
	p.display();
});