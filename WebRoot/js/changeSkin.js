//The site skin
$(function(){
		var $li =$("#skin li");
		$li.click(function(){
			switchSkin( this.id );
		});
		var cookie_skin = $.cookie("MyCssSkin");
		if (cookie_skin) {
			switchSkin( cookie_skin );
		};

});

function switchSkin(skinName){
		$("#"+skinName).addClass("selected")                //current<li>Element selected
					   .siblings().removeClass("selected");  //Get rid of other peers<li>Elements of the selected
	    $("#cssfile").attr("href","css/"+ skinName +".css"); //Set different skin
		$.cookie( "MyCssSkin" ,  skinName , { path: '/', expires: 10 });
}

