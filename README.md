# Authors-R-US


======================================================================================

User Story for MVP

 * User can register/login or visit About Us link on the home page.
 * It is required to register to have access to the web site.
 * Once user registers/logs in they are taken to a list (index page) of user created stories.
 * The user can navigate the site using the nav bar in the header.
 * The Author's page shows a list of authors. Here the user can go to the author's profile and see their stories.
 * The Stories page lists all the stories written by authors. The user can read a story or go to the author's profile.
 * My Profile page will contain details about the user, they can edit or delete their profile here. 
 * Profile page also shows whether a user is restricted as commentor or has access as an Author.
 * After user makes 10 comments their profile will be updated as an Author, where they have access to create, edit, delete their own stories.
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
