# steps

1. setup project using template files by shaun and run npm install
2. create home, login & signup pages and routes
	- install react-router-dom@5.1
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
	- send the state and dispatch to AuthContext.Provider so technically they will be available throughout the application since the children is the App
	- create authReducer function which has a switch statement to delegate the return value based on action.type
	- import AuthContextProvider in App.js and wrap App in index.js with AuthProvider
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
	- just like signup hook
15. use login hook
	- don't forget to dispatch
16. condition to show user content
	- use useAuthContext, get the user
	- use the user to control display in navbar
17. firebase auth state change
	- the problem is, even though logged in, when refresh, we lose the login data
	- so in AuthContext, we add authIsReady in the state to mark if we have checked with firebase or not when page is refreshed
	- use useEffect, inside use projectAuth.onAuthStateChanged
	- update dispatch accordingly
	- call unsub
18. waiting until auth is ready
	- import useAuthContext in the App.js
	- use isAuthReady, only display context when isAuthReady is true
19. route guarding
	- get user from useAuthContext
	- import Redirect
	- use user to control the routes accordingly
20. make transaction form
	- in Home.js, the main page split into 2 columns, left is transaction list and on right transaction form
	- create transaction form in it's own component, then import it into Home.js
	- create the transaction form as usual and console log the name and amount
21. create useFirestore hook
	- to add and to remove document
	- create the boiler plate first
	- at the top import all the standard things
	- create useFirestore hook as usual, send the argument "collection" to it, so it is dynamic, can be used for any collection
	- use useReducer, to return dispatch function and response, then create the dispatch function as usual, set the initial state of the state
	- don't forget isCancelled
	- get reference to collection in firestore using projectFirestore and send the collection as argument
	- create add document and delete document functions
	- create useEffect to set isCancelled
	- return add document, delete document and response
22. add firestore documents
	- start with dispatching is pending and update the switch
	- use try catch
	- await ref to add doc
	- dispatch added document if !iscancelled and update the switch
	- when error, dispatch accordingly if !iscancelled and update the switch
23. firestore timestamps
	- we want to add createdAt field in the document
	- we'll use special data type called firebase timestamp
	- can't use normal date type coz firebase will not be able to process accordingly
	- update firebase config.js and create timestamp const and export it
	- import it in useFirestore 
	- create the createdAt and add it to the doc object right before saving it to the database
24. use useFirestore hook
	- in TransactionForm import useFirestore and get addDocument and response
	- don't forget to send "transactions" as the argument to the useFirestore()
	- use addDocument function and save the document in handleSubmit
	- use reponse to display error or loading button
	- add uid to the document, so we know who the document belongs to
	- get user using useAuthContext in Home.js, send user.uid to TransactionForm, then in Transaction form receive it and assign to the object which to be saved
	- to clear the fields after saving, use useEffect in TransactionForm after handle submit, use response.success
25. create useCollection hook
	- to retrieve documents
	- set useCollection to receive parameter collection to make it dynamic
	- import standard hooks and projectFirestore
	- create standard states, documents and error
	- we are not gonna use useReducer because the states involved are not as complicated as in useFirestore
	- use useEffect because we want the code to run right away as soon as the component mounts
	- useEffect function fires as soon as the component using this hook mounts the dom
	- use onSnapshot because it is a real time listener
		- it will run a function for use everytime we got a snoptshot back from firestore collection
		- that snapshot represents that collection at that moment in time which will contain the documents on it
		- it will fire the function again when the firestore collection changes(add, remove, update) - will send the snapshot
		- will then update our states
	- ref.onSnapshot, return unsub
	- we will cycle the documents inside the snapshot and update our local state - results[], snapshot.docs.forEach(doc => {results.push(...doc.data())})
	- we will also add the document id in the results[], doc.id
	- then update documents state, and error state
	- pass second argument in the snapshot function, a function that receive the error and we can set error state and log out the error
	- dont forget to unsubscribe on unmount using the unsub
	- finally return documents and error
26. list transactions
	- import useColleciton in Home and get the documents and error
	- first display error is there's any
	- then display documents is threre's any
	- instead of display directly, we create another component, TransactionList and we send the documents into it
		- to make it reusable
		- so Home is not to bloated
	- create the component in home folder, boiler plate the code first and then import styles
	- use ul
	- cycle the transactions using map, coz it will return a new list of li
	- give classname for ul, li and 2 p
	- using transaction.id as the key in li
	- output name and amount in p 
27. firestore query
	- to filter retrieved collection belongs to the logged in user
	- use where method on the collection ref
	- but we are not gonna do it in useCollection because maybe we want to retrieve collection without any filter
	- instead we will pass a second arguments, the query
	- if the query is available, we will update the ref.where with the query
	- if the query is empty, then we will set no filter at all
	- in Home, we add the second argument, an array with 3 elements, "uid", "==", user.uid
	- one problem, the query is array, so it's a reference type in javascript, which will cause an infinite lop
	- solution, use useRef
28. order firestore query
	- send third argument to useCollection, orderBy
	- same concept with query, send an _array, use useRef to the the orderBy
	- check if available, then sort, if not, don't sort
29. delete transaction
	- finish the delete function in useFirestore
	- dispatch is pending, use try catch, delete using ref and is not cancelled call the dispatch function
	- in error part, is not cancelled, call the dispatch function
	- in TransacitonList import useFirestore, get the deleteDocument function
	- add button at the bottom and onclick send an arrow function which will call the deleteDocument function and send in the transaction id
	- done and done