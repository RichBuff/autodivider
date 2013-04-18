(function($){

    var options;

	//testing
	function easySelect(element, options) {

        this.popuptemplate = "'<div data-role=\"popup\" id=\"popupBasic\">" + 
                            "<p>This is a completely basic popup, no options set.<p>" + 
                            "</div>'";
    
		//Defaults:
		this.defaults = {
			something: 'cool',
            popupid: '',
            element: $(element)
		};

		//Extending options:
		this.opts = $.extend({}, this.defaults, options);

		//Privates:
		this.$element = $(element);
		this.$parentElement = $(element).parent();
	}

	// Separate functionality from object creation
	easySelect.prototype = {

		init: function() {
            this.$element.hide();
            
            if (this.opts.popupid == '') {
                alert("You need to supply a template id");
            }
            
            options = this.opts;

            this.buildList();
            
            $("#"+options.popupid).bind("popupbeforeposition", function(evt){
                var height = $(this).find("ul.sortedList").height();
//                $("#sorter").css("height",height);
                $(this).find("ul.sortedList").css("border","0px solid red");
                $(this).find("ul.sortedList").css("top","-30em");
            });
            
            this.$parentElement.bind("click", function(evt){
                evt.preventDefault();
                $("#"+options.popupid).popup("open");
                                
               	$( "#sorter li" ).click( function() {
                    var top,
                        letter = $( this ).text(),
                        listtop = $( ".sortedList" ).offset().top;
                        divider = $( ".sortedList" ).find( "li.ui-li-divider:contains(" + letter + ")" );
                    
                    divider.parent().scrollTop(0);	
                    if ( divider.length > 0 ) {
                        top = divider.offset().top;
                        
                        divider.parent().scrollTop(top - listtop);
                        return true;
                    } else {
                        return false;
                    }
                });

                $( "#sorter ul li" ).hover(function() {
                    $( "#sorter ul li" ).addClass("shorter");
                    $( this ).addClass( "ui-btn-up-b" ).removeClass( "ui-btn-up-c" );
                }, function() {
                    $( "#sorter ul li" ).addClass("higher");
                    $( this ).removeClass( "ui-btn-up-b" ).addClass( "ui-btn-up-c" );
                });
                
                $("#sorter").show();
            });                        
		},

		buildList: function() {

			$("#"+options.popupid).append('<ul id="thefilter" name="thefilter" data-role="listview" data-autodividers="true" class="sortedList" ></ul>');
            $(this.$element).find("option").each(function() {
                $('#thefilter').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
            });
            
            $('#thefilter').find("li").bind("click", function(evt){
//                alert("li = " + $(this).html() + " : " + $(this).attr("value"));
                $("#"+options.popupid).popup("close");
                $("#sorter").hide(400);
                var somevalue = options.element.val();
                options.element.val($(this).attr("value"));
                options.element.trigger('change');
            });
            
            $("#"+options.popupid).trigger("create");
		}
	};

	// The actual plugin
	$.fn.easySelect = function(options) {
		if(this.length) {
			this.each(function() {
				var rev = new easySelect(this, options);
				rev.init();
				$(this).data('testing', rev);
			});
		}
	};
})(jQuery);
