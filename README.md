# Authors-R-US


======================================================================================

User Story for MVP

 * User can register or login on the home page
 * The user can navigate between the home page and the about me page
 * It is required to register to have access to the web site
 * Once user registers/logs in they are taken to a list (index page) of stories
 * The nav tabs will be, Authors, Stories, My profile
 * Authors tab will take the user to a list (index page) of author's , here the user can go to a author's profile page
 * The user can select which story they want to read written by that author on their profile
 * Stories tab will take the user to a list (index page) of stories where they can select which story to read
 * My Profile tab will contatin details about the user, they can edit or delete their profile 
 * The user will see they are currently a commentator and will need to make 10 comments to create their own story
 * There will see a button they can click on to see their current comments 
 * Once the user has 10 comments their staus will be updated to Author
 * The user can now create stories and see a list of their stories 
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
