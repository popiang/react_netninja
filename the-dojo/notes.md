steps

1. get the template files, npm install & install firebase
2. configure firestore in firebase for database, auth and storage
3. create  firebase config file
4. firebase init
	- Firebase: Configure security rules and indexes files for Firestore
	- Hosting: Configure files for Firebase Hosting
	- Storage: Configure a security rules file for Cloud Storage
5. get context and hooks files from previous project and use the authprovider in index.js
6. setup the pages and routers, install react-router-dom@5.1
7. create navbar
8. create sidebar
9. create signup form
10. handle the file input
	- handle input error message
	- init firebase storage service
11. handle signup 
	- add upload user thumbnail in useSignup
	- signup the user
12. create a user document
13. creage login
14. redirect & route guards
15. conditional navbar links
16. set the avatar components - create avatar.js
17. create online user list and show users online
18. create create project form
	- install and use react-select for select in the form
	- add checking for category & assignedUsers
	- add createdBy object, assignedUsersList array
	- create project object
	- save the project
19. list projects in the dashboard
	- create projectlist.js
20. create a document hook
21. use document hook in project page to get a document
22. create projectsummary.js and call in project page
23. create projectcomment.js and call in project page
24. update useFirestore.js to add updateDocument
25. add comment into project
26. completing/deleting project
	- redirect after deleting
27. filter part 1 - create ProjectFilter.js
28. filter part 2 - move current filter to dashboard
29. filter part 3 - filter documents
30. adding firestore rules
31. final touch - date on comment
32. deploy the app
33. done and done