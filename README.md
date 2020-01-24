# Authors-R-US


======================================================================================

User Story for MVP

 * User can register or login on the home page
 * The user can navigate between the home page and the about us page
 * It is required to register to have access to the web site
 * Once user registers/logs in they are taken to a list (index page) of stories
 * The user can navigate the site using the nav bar
 * The authors page will show a list of authors, and user can go to their profile from there, and select their stories
 * The stories page will list all the stories written by authors, and the user can select one to read or go to the authors        porfile
 * My Profile page will contatin details about the user, they can edit or delete their profile 
 * The user will see they are currently a commentator on the profile page, and will need to make 10 comments to create their 	own story
 * Once the user makes 10 comments their profile will be updated as an Author 
 * The user can now create their own stories, read, edit or delete them
 * When the user is logged out they are taken to login/register home page

======================================================================================

======================================================================================

User Story Stretch Goals 

* User age raiting stories - users will need to be a certain age to read a story
* Adaptive profile page, users can store mulltiple photos on their profile page
* User can link publications from other sites 
* Users can upload videos of story telling in live performances 
* User can upload audio clips of their stories 
* User can login/sign up with google 
* User can reset password if they forget password 



======================================================================================



======================================================================================

Models Wireframe 


User {
	username: string,
	password: string,
	firstName: string, 
	lastname: string, 
	email: string, 
	dob: date,
	aboutMe: string,
	createdOn: {
		type: date,
		default: date.now
	}
	profilePhoto: string,
	author: {
	 	type: boolean,
		default: false
	}
}

Story {
	title: string,
	genre: string,
	body: string,
	commets: [comments.schema],
	createdOn: {
		type: date,
		default: Date.now
	}
}

Comment {
	comments: string,
	createdOn: {
		type: date, 
		default: Date.now
	}
	user: ref - user 
	
}

Raiting {
	raiting: boolean,
	user: ref - user
	story: ref - story
	
}

======================================================================================
