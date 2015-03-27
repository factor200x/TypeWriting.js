(function($){

	/* ---------------------------------- *\
					打 字 機
	\* ---------------------------------- */

	var part1 = '@-webkit-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } ';

	var currentNumber = 1;
	var inHtmlTag;

	$.fn.typewriting = function( input_string, options, callback_func ) {

		this.text("A");
		var cursorHeight = this.height();
		this.text("");

		var setting = $.extend({
			typing_interval: 150,
			blink_interval: "0.7s"
		}, options);

		var part2 = '.typingCursor::after { content: ""; width: 10px; height: ' + cursorHeight + 'px; margin-left: 5px; display: inline-block; vertical-align: bottom; background-color: black; -webkit-animation: blink ' + setting.blink_interval + ' infinite; -moz-animation: blink ' + setting.blink_interval + ' infinite; animation: blink ' + setting.blink_interval + ' infinite; }';

		$('head').append( '<style type="text/css">' + part1 + part2 + '</style>' );

		var target = this.addClass("typingCursor");

		typingGo();



		function typingGo() {

			if( currentNumber <= input_string.length ) {

				var thisText = getText();

				if( thisText.slice(-1) == "<" ) inHtmlTag = true;
				if( thisText.slice(-1) == ">" ) inHtmlTag = false;

				target.html( thisText );

				if( inHtmlTag )
					typingGo();
				else
					setTimeout( function(){
						typingGo();
					}, setting.typing_interval);

			} else
				callback_func();
		}



		function getText() {
			var returnString = input_string.slice( 0, currentNumber );
			currentNumber++;
			return returnString
		}

	};

}(jQuery));

