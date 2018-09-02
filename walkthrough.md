## Walkthrough of journal app client

#### Basics

​	Index.js renders the App container in the root of the html file. 
	Basically all my code is in the src file.

#### App.js 

- Renders SignUpForm and SignInForm.
- Switches to other child components after sign in (when token switches null to string)
- Stores most of the state of the app
  - Messages for all the authentication and PostForm, sign-in token, and the array of posts.
- Convoluted system to display messages
  - Stores in state what UI message there is and which component it is for (component stored as a string feedbackComponent).
  - Function to set message state is passed down as a prop to child components.
  - For ALL child components, the message is conditionally passed down if the string feedbackComponent matches the string of the current component.
  - If no message, null is passed down.
  - All child components display the message.	

#### SignUpForm (& other child components)

- Utilizes axios (installed npm package) to post requests.
- config.js determines whether system is on local or production host & routes appropriately

#### SignInForm 

- If a user signs in, passes token up to App.js state using the prop setToken
- performs axios request to get user’s posts and add them to App.js state
- PostList is hooked to display all of the posts in state, so they display
- App.js then removes sign up and sign in and renders sign out, change password, and PostForm

#### PostForm 

- Creates a post in the database via axios request.
- Upon success, uses addPost method which is passed down from App.js.
- Pushes current post onto the post array (using setState to safely modify state).

#### PostList

- Displays each post in a loop. 
- Passes to each post the props needed to delete post, and needed for UpdatePostForm

#### Post

- Unlike all the other components (except App.js), Post is stateful.
  - This breaks the pattern Arjun taught us to keep all state in the top container component. However, it makes it much easier for each post to have its own update form, which I liked much better from a UI perspective than having to click an update button and then navigate to the top of the page.
- Post state stores whether that post needs to be updated.
  - If so, Post renders UpdatePostForm
- Post also handles the delete post axios request and passing that information back through props to App.js
- Post state also handles the messages for Post and UpdatePostForm.



#### UpdatePostForm

- Rendered on each post if its state indicates it needs to be updated (following user clicking on Update button)
- Axios request to update form, then set the App.js state of the post list, then user messaging via setting the message state of the associated Post.