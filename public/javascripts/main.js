$(function() {
    //alert("Hello World");

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
			//alert(keyword + ' has a value. make ajax request');

			var rootUrl = 'http://api.nytimes.com/svc/movies/v2/reviews/search';
			var api_key = '056315a59749a59d691a6476f262a589:3:74337495';
			$.ajax({
				method: "GET",
				url: rootUrl,
				data: {"query": keyword, "api-key": api_key}
			}).done(function(data){
				//console.log(data.results[0].nyt_movie_id + " " + data.results[0].display_title);
				movie_container.empty();
				for(i=0; i < data.results.length; i++) {
					//console.log(data.results.length);
					//console.log(data.results[i].display_title);
					movie_container.append("<div><a href='/movies/show/" + data.results[i].nyt_movie_id + "'>" + 
						data.results[i].display_title + "</a></div>");
				}
			});

		} else {
			console.log(keyword.val);
			err.text("Please enter a valid search criteria.");
			err.css('visibility','visible');
		}
		
		//if keyword is not null, and isn't just a space, then make the ajax call
		//write the ajax call results to the results div $('#movie_results_box').append(ajax results variable) by looping through
		//results will need to be links to the movie you want which will populate in the show action of the movie resource
			//and make a second api call to the ny times to get the links of the reviews which will populate in a div on that page
		//the id's of the anchor tags will be the id's of the movies returned from nyt so that they can be used in the second
			//ajax request
		//set the display of the div to block and apply the jquery slide method as a feature possibly after results are back

	});



});