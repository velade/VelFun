$(document).ready(function () {

$(".left ul li").click(function(){
	var _page="pages/"+$(this).attr("data-page")+".html";
	$(".right iframe").attr('src',_page);
})

})