$( document ).ready(function() {
		console.log("******* map object js starts ******" );
		let text = '';
		let text2 = '';
		const colors = new Map([
			[ "blue",100],
			["pink",200],
			["purple",300]]);

		colors.set("white",234);
		console.log(colors.get("white"));

		console.log(colors.size);

		colors.delete("purple");
		console.log(colors);

		colors.forEach(function(key,value){
			text += key + ">" + value;
		});
		console.log(text);

		for (const x of colors.entries()) {
		  text2 += x;
		}
		console.log(text2);
});