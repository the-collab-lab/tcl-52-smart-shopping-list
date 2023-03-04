import './Home.css';
import { useCallback, useState } from 'react';
import { checkListToken } from '../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom';

export function Home({ handleNewToken, setListToken, listToken }) {
	const [token, setToken] = useState('');
	const [listNotFound, setlistNotFound] = useState('');
	const [showJoinList, setShowJoinList] = useState(false);
	const redirect = useNavigate();

	if (listToken) {
		redirect('/list');
	}

	const handleCreateNewList = useCallback(() => {
		handleNewToken();
	}, [handleNewToken]);

	const handleJoinExistingList = () => {
		setShowJoinList(true);
	};

	const handleFormChange = (e) => {
		const value = e.target.value;
		setToken(value);
	};

	const handleTokenSubmit = async (e) => {
		e.preventDefault();
		const caseSensitiveToken = token.toLowerCase();
		const checkTokenExists = await checkListToken(caseSensitiveToken);

		if (checkTokenExists) {
			setListToken(caseSensitiveToken);
			redirect('/list');
		} else {
			setlistNotFound('Could not find this list');
		}
	};

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List</h2>
			<NavLink to="/about">Learn how to use the Shopping List App</NavLink>
			<div className="home-buttons">
				<button onClick={handleCreateNewList}>Create New List</button>
				<button onClick={handleJoinExistingList}>Join Existing List</button>
			</div>
			{showJoinList && (
				<form onSubmit={handleTokenSubmit}>
					<label htmlFor="token"> Enter Token:</label>
					<input
						type="text"
						name="token"
						id="token"
						value={token}
						onChange={handleFormChange}
						required
						aria-describedby="token-desc"
					/>
					<button type="submit"> Join</button>
					<div id="token-desc">
						A token is three space-separated words, like{' '}
						<code>my list token</code>
					</div>
				</form>
			)}
			<p>{listNotFound}</p>
		</div>
	);
}
