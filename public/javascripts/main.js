$(function() {
    //alert("Hello World");
	var api_key = '056315a59749a59d691a6476f262a589:3:74337495';

	$("#login_form").submit(function(evt){
		
		evt.preventDefault();
		
		//alert('default prevented');
	});

	//movie search page functions
	$('#movie_search_frm').submit(function(event) {
		event.preventDefault();
		var keyword = $('#keyword_box').val();
		var err = $('#error_msg');
		var movie_container = $('#movie_results_box');

		if(!(keyword===null) && !(keyword===" ") && !(keyword==="")) {
			err.css('visibility','hidden');
			keyword = encodeURIComponent(keyword);
			keyword = "'" + keyword + "'"; //need double quotes to avoid nyt OR query
			alert(keyword);
			var rootURL = 'http://api.nytimes.com/svc/movies/v2/reviews/search';
			
			//ajax call to build list of movie titles
			$.ajax({
				method: "GET",
				url: rootURL,
				data: {"query": keyword, "api-key": api_key}
				
			}).done(function(data){
				movie_container.empty();
				movie_container.append("<h2>Results: </h2>");
				for(i=0; i < data.results.length; i++) {
					movie_container.append("<div><a class='m_link' href='/movies/" + data.results[i].nyt_movie_id + "'>" + 
						data.results[i].display_title + "</a></div>");
				}
			});

		} else {
			console.log(keyword.val);
			err.text("Please enter a valid search criteria.");
			err.css('visibility','visible');
		}
	});

	$('#reviews_list').slide();
		//2nd api call for the movies show route
		//data: {"nyt_movie_id": keyword, "api-key": api_key}
		//results will need to be links to the movie you want which will populate in the show action of the movie resource
			//and make a second api call to the ny times to get the links of the reviews which will populate in a div on that page
		//the id's of the anchor tags will be the id's of the movies returned from nyt so that they can be used in the second
			//ajax request
		//set the display of the div to block and apply the jquery slide method as a feature possibly after results are back
});	
