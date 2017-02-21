



$("li[role='tab']").click(function(){
	$("li[role='tab']").attr("aria-selected","false"); //deselect all the tabs
 	$(this).attr("aria-selected","true");  // select this tab
	var tabpanid= $(this).attr("aria-controls"); //find out what tab panel this tab controls
   var tabpan = $("#"+tabpanid);
	$("div[role='tabpanel']").attr("aria-hidden","true"); //hide all the panels
	tabpan.attr("aria-hidden","false");  // show our panel
 });
