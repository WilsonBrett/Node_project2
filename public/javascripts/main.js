$(function() {
	//to hide this make the ajax call to my server first and then make a ss call to nyt
	var api_key = '056315a59749a59d691a6476f262a589:3:74337495';
	
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
			var rootURL = 'http://api.nytimes.com/svc/movies/v2/reviews/search.json';
			
			//ajax call to build list of movie titles
			$.ajax({
				method: "GET",
				url: rootURL,
				data: {"query": keyword, "order":'by-title', "api-key": api_key}
				
			}).done(function(data){
				movie_container.empty();
				var titleStr = "<h2>NYT Results</h2>";
				
				for(i=0; i < data.results.length; i++) {
					var title = data.results[i].display_title;
					//var titleEncode = encodeURI(title);
					//console.log(title + " => " + titleEncode);
					titleStr += "<div><a class='m_link' href='/movies/" + title + "'>" + title + "</a></div>";
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
