// import React, { useState } from 'react';
// // import { useHistory } from 'react-router-dom'; // Import useHistory
// import styles from '../../styles/Signin.module.css';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   // const history = useHistory(); // Initialize useHistory

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Signup failed');
//       }

//       const data = await response.json();
//       const token = data.token;

//       // Store the token in localStorage or Redux state
//       localStorage.setItem('token', token);

//       // Redirect to a different route upon successful signup
//       history.push('/dashboard'); // Change '/dashboard' to your desired route
//     } catch (error) {
//       setError('Signup failed. Please try again.');
//       console.error('Error signing up:', error.message);
//     }
//   };

//   return (
//     <div className={styles.mainContainer}>
//       <div className={styles.container}>
//         <h1 className={styles.title}>SPOTI-CHAT</h1>
//         <h2 className={styles.header}>Signup</h2>
//         <form className={styles.form} onSubmit={handleSignup}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Email</label>
//             <input className={styles.input} type="text" value={email} onChange={handleEmailChange} required />
//           </div>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Password</label>
//             <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} required />
//           </div>
//           <button className={styles.button} type="submit">Signup</button>
//         </form>
//         {error && <p className={styles.error}>{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Signin;

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Signin.module.css';
import axios from 'axios';

// const defaultProps = {
// 	image: 'https://images.unsplash.com/photo-1610737241336-371badac3b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGNoYXQlMjB8ZW58MXx8fHwxNzAzMzcwNDY4fDA&ixlib=rb-4.0.3&q=80&w=1080',
// }

const Signup = () => {
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});
	const router = useRouter();

	const handleChange = (e) => {
		// e.preventDefault();
		setUser((prevValue) => {
			return {
				...prevValue,
				[e.target.name]: e.target.value,
			};
		});
	};

	const onSubmit = (e) => {
		const { firstName, lastName, email, username, password, confirmPassword } =
			user;
		e.preventDefault();

		// if any are empty, return error
		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			username === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			setError('Missing a value');
			console.log(user);
		} else if (password !== confirmPassword) {
			setError("Passwords don't match");
		} else {
			setError(''); // clear the error message
			handleSignup(e);
		}
	};

	const handleSignup = async (e) => {
		// e.preventDefault();

		axios
			.post('http://localhost:8000/users/signup', user)
			.then((response) => {
				console.log(response.data);
				router.push('/spotifyLogin');
			})
			.catch((error) => {
				console.error('Error creating new user', error);
			});
	};

	return (
		<div>
			<div className={styles.mainContainer}>
				<img className={styles.image}
					src='../images/signUp-Image.png' // Replace with the actual path to your image
					alt="Description of the image"></img>
				<div className={styles.container}>
					<form className={styles.form} onSubmit={handleChange}>
						<div className={styles.formGroup}>
							<label className={styles.label}>First Name</label>
							<input
								className={styles.input}
								type="text"
								// value={user.firstName}
								name="firstName"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}>Last Name</label>
							<input
								className={styles.input}
								type="text"
								// value={user.lastName}
								name="lastName"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}>Email</label>
							<input
								className={styles.input}
								type="text"
								// value={user.email}
								name="email"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}>Password</label>
							<input
								className={styles.input}
								type="password"
								// value={user.password}
								name="password"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}>Confirm Password</label>
							<input
								className={styles.input}
								type="password"
								// value={user.passwordConfirm}
								name="confirmPassword"
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}>Username</label>
							<input
								className={styles.input}
								type="text"
								// value={user.username}
								name="username"
								onChange={handleChange}
								required
							/>
						</div>
						<button className={styles.button} type="submit" onClick={onSubmit}>
							Signup
						</button>
					</form>
					{error && <p className={styles.error}>{error}</p>}
				</div>
			</div>
		</div>
	);
};

export default Signup;

// import React from 'react';

// const styles = {
//   ImageContainer: {
//     top: '0px',
//     left: '0px',
//     width: '937px',
//     height: '900px',
//     backgroundImage: 'url(./image.jpeg)',
//     backgroundPosition: 'center center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//   },
// };

// const defaultProps = {
//   image: 'https://images.unsplash.com/photo-1610737241336-371badac3b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGNoYXQlMjB8ZW58MXx8fHwxNzAzMzcwNDY4fDA&ixlib=rb-4.0.3&q=80&w=1080',
// }

// const Image = (props) => {
//   return (
//     // <div style={{
//     //   ...styles.ImageContainer,
//     //   backgroundImage: `url(${props.image ?? defaultProps.image})`,
//     // }} />
//   );
// };

// export default Image;
