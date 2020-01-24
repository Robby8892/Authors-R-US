# Authors-R-US


======================================================================================

User Story for MVP

 * User opens site to a home page to register/login 
 * The user can nav between this and the about me nav 
 * User must register to be able to login into the site
 * Once user registers they are taken to a list (index page) of stories by author
 * User can navigate to either a Author(show page) list(index page) of stories
 * Or user can go to the story itself (show page)
 * In each story (show page) the user can leave a comment & review for that story
 * The user can use the nav bar to see a list of their current comments
 * The user can edit/delete their comments and raitings, but can not increment raitings for one story
 * In each navigation they can go either way they choose i.e. in the reverse order
 * The user can access the Nav bar to also go to their profile 
 * The user can make changes to their profile, including details about themself
 * The user profile page will also have a status of reviwer 
 * If the user has 10 comments they will have the ability to create a story 
 * The user can now see a create story route on their nav bar 
 * They can also see a button on their profile to access their stories
 * The user can also access this on the nav bar as my stories 
 * On each profile of the users stories they can see comments and edit/delete their story
 * When a story is destoryed all their comments and raitings will be destoryed 
 * The user at any time can cancel their account on their profile or edit 
 * If the user destorys their profile their stories, comments and raitings are destoryed
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

```
User {
	username: string,
	password: string,
	firstName: string, 
	lastname: string, 
	email: string, 
	dob: num,
	aboutMe: string,
	profilePhoto: string
	
}

Story {
	title: string,
	genre: string,
	body: string,
	commets: [comments.schema],
	raiting: [raitings.schema]

}

Comment {
	comments: string,
	user: ref - user 
	
}

Raiting {
	raiting: boolean,
	user: ref - user
	
}
```

======================================================================================