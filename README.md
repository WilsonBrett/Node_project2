# Show Me the Movie!
## General Assembly Project #2

This project was created while I was in the General Assembly web development immersion program in early 2016. The course objective was to use NodeJS in conjunction with jQuery/Ajax to make api calls to an api of our choice.  I chose to work with the NYT movie review database api to retrieve movie results based on user input and then have reviews and other basic info about the movie show in a details view. 

Basically, a user enters a movie search term and on submit an ajax request is made to the NYT api to grab a set of movies that fit the criteria. The results are then listed out on the page as links. When a link is clicked another http request is made server-side from node to the NYT api to get the details of that one movie. The reason for making this request server-side was because I wanted to list the details of the selected movie in a new view and needed to the data first on my server before generating that view. I also did not cache the results from the first ajax request but probably hould have.

 So, while the app is not going to actually show you a movie you can type in a keyword to see when it was released, what the rating was, and any comments left by critics that are being stored by the NYT.  

Other technologies include MongoDB, express, and the mongoose ORM.
