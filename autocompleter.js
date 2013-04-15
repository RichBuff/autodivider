function initPage(ars) {
//    alert("test");
     $.mobile.hidePageLoadingMsg();
     
//     $("#state").bind("click", handleSelectClick);
//     $("#state").parent().bind("click", function(evt){
//        $("#popupBasic").popup("open");
//     });
     
     $("#state").easySelect({
            popupid: "popupBasic"
        });

}

function handleSelectClick(evt) {
    evt.preventDefault();
    alert("test");
}