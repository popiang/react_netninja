# steps

1. setup project using template files by shaun
2. create home, login & signup pages and routes
3. create navbar
4. create login form
5. create signup form
6. setup firebase for db and auth and create the config file
7. create signup hook
8. use signup hook
9. create auth context
	- context here is how we can make certain info available throughout the application
	- we create a context, wrap any component with the context, so any info in the context is available in the component
	- in our use case, we wrap the App component with the context, so any info such us the logged in user info in the context can be made available in the entire application, thus can be used for any necessary action or control
	- create folder and file of authContext
	- import createContext and useReducer from react
	- AuthContext=createContext(), then return AuthContext.Provider which will be used to wrap any component/children
	- create state & dispatch const from useReducer which accept authReducer and user object as parameters
	- create authReducer function which has a switch statement to delegate the return value based on action.type
	- wrap App in index.js with AuthProvider
	- create useAuthContext hook
	- useAuthContext will use useContext, which means it will use the context that we created above, so then we can get the info in the context
	- import AuthContext and useContext
	- we create useAuthContext for 2 reasons, 1. so we don't have to use the context directly from authContext.js, so it's easier and simpler 2. we can add additional logic or checking as we needed
	- in the file, check if context is available (!context), if not, throw an error
10. dispatch login action
	- import useAuthContext into useSignup.js
	- call dispatch with the respective arguments after signing up the user
11. create logout hook
	- just follow useSignup hook
	- update authContext
	- update Navbar.js to add logout button
12. use logout hook
13. add cleanup function
14. create login hook
15. use login hook
16. condition to show user content
17. firebase auth state change
18. waiting until auth is ready
19. route guarding
20. make transaction form
21. create useFirestore hook
22. add firestore documents
23. firestore timestamps
24. use useFirestore hook
25. create useCollection hook
26. list transactions
27. firestore query
28. order firestore query
29. delete transaction