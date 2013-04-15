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
            popupid: ''
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
            
            this.$parentElement.bind("click", function(evt){
                evt.preventDefault();
                $("#"+options.popupid).popup("open");
            });
		},

		buildList: function() {
			$("#"+options.popupid).append('<ul id="thefilter" name="thefilter" data-role="listview" data-autodividers="true" class="sortedList2" ></ul>');
            $(this.$element).find("option").each(function() {
                $('#thefilter').append('<li value="' + this.$element + '">'+$(this).text()+'</li>');
            });
            
            $(thefilter).find("li").bind("click", function(evt){
                alert("li = " + $(this).html());
            });
            
//            $("#"+options.popupid).append("<div>Test</div>");
//            $("#"+options.popupid).trigger("create");
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
