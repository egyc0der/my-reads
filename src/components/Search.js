import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { SearchTerms } from "./others/SearchTerms";
export default function Search() {
	const Navigate = useNavigate();
	const [data, setData] = useState([]);
	const [searchStr, setSearchStr] = useState("");
	const [bookToShelfObj, setBookToShelfObj] = useState({});

	const handleChange = (evt) => {
		SearchTerms.filter((x) =>
			x.toLowerCase().includes(evt.target.value.toLowerCase())
		).length > 0
			? setSearchStr(evt.target.value)
			: setSearchStr("");
	};

	const handleShelf = (shelfValue, bookObj) => {
		setBookToShelfObj({ shelf: shelfValue, book: bookObj });
	};

	useEffect(() => {
		Object.keys(bookToShelfObj).length &&
			BooksAPI.update(bookToShelfObj.book, bookToShelfObj.shelf);
	}, [bookToShelfObj]);

	useEffect(() => {
		searchStr.length > 0
			? BooksAPI.search(searchStr)
					.then((data) => data && setData(data))
					.catch((error) => console.log(error))
			: setData([]);
	}, [searchStr]);

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<button className='close-search' onClick={() => Navigate("/")}>
					Close
				</button>
				<div className='search-books-input-wrapper'>
					<input
						type='text'
						placeholder='Search by title or author'
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className='search-books-results'>
				<ol className='books-grid'>
					{searchStr !== "" &&
						(Array.isArray(data) &&
						data.length !== 0 &&
						data !== undefined &&
						!data.error ? (
							data.map((item) => (
								<Book key={item.id} bookData={item} handleShelf={handleShelf} />
							))
						) : (
							<h1>No Result</h1>
						))}
				</ol>
			</div>
		</div>
	);
}
