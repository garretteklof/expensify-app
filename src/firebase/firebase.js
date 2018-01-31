import * as firebase from 'firebase';

const config = {
		apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };


// database.ref('expenses').on('child_removed', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('value', (snapshot) => {
// 	const expenses = [];
// 	snapshot.forEach((childSnapshot) => {
// 		expenses.push({
// 			id: childSnapshot.key,
// 			...childSnapshot.val()
// 		});
// 	});
// 	console.log(expenses);
// });


// database.ref('expenses').push({
// 	description: 'first',
// 	note: 'first',
// 	amount: 100,
// 	createdAt: 0
// });

// database.ref().on('value', (snapshot) => {
// 	const data = snapshot.val();
// 	console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
// });

// firebase.database().ref().set({
// 	name: 'Garrett Eklof',
// 	age: 27,
// 	isSingle: true,
// 	location: {
// 		city: 'Madison',
// 		country: 'United States'
// 	}
// });

// database.ref('attributes').set({
// 	height: 71,
// 	weight: 165
// }).then(() => {
// 	console.log('working!');
// }).catch((e) => {
// 	console.log(e);
// });

// database.ref().update({
// 	stressLevel: 9,
// 	job: {
// 		company: 'Amazon',
// 		title: 'Developer'
// 	},
// 	'location/city': 'Seattle'
// });

// database.ref('isSingle')
// 	.remove()
// 	.then(() => {
// 		console.log('removed data');
// 	}).catch((e) => {
// 		console.log(e);
// 	});