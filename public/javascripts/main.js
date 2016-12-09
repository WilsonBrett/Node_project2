$(function() {

	//movie search page functions
	$('#movie_search_frm').submit(function(event) {
		event.preventDefault();
		var keyword = $('#keyword_box').val();
		keyword = keyword.trim();
		keyword = encodeURIComponent(keyword);
		//console.log(keyword);
		var err = $('#error_msg');
		var movie_container = $('#movie_results_box');

		if(!(keyword===null) && !(keyword===" ") && !(keyword==="")) {
			err.css('visibility','hidden');
			var rootURL = 'http://omdbapi.com';

			//ajax call to build list of movie titles
			$.ajax({
				method: "GET",
				url: rootURL,
				data: {"s": keyword, "type":"movie"}

			}).done(function(data){
				movie_container.empty();
				var titleStr = "<h2>OMDB Results</h2>";

				for(i=0; i < data.Search.length; i++) {
					var title = data.Search[i].Title;
          var id = data.Search[i].imdbID;
					titleStr += "<div><a class='m_link' href='/movies/" + id + "'>" + title + "</a></div>";
				}
				movie_container.append(titleStr);
			});

		} else {
			//console.log(keyword.val);
			err.text("Please enter a valid search criteria.");
			err.css('visibility','visible');
		}

		//new user registration cancel button
		$('#cancel_user_btn').click(function(evt){
			evt.preventDefault();
		});
	});

	//add focus/blur css to input boxes
	var inputElems = ['#email','#password','#keyword_box','#email_box','#password_box'];
	$.each(inputElems, function(index, val){
		$(val).focus(inputFocus);
		$(val).blur(inputBlur);
	});

	function inputFocus() {
		$(this).css('border','2px solid red');
	}

	function inputBlur() {
		$(this).css('border','2px solid white');
	}
});
