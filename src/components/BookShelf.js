import React from "react";
import Book from './Book'
import * as BooksAPI from "../BooksAPI";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

export default function BookShelf({title,books,idUpdate}) {
    const [bookToShelfObj, setBookToShelfObj] = useState({});
    
    const handleShelf = (shelfValue, bookObj) => {
                setBookToShelfObj({ shelf: shelfValue, book: bookObj });
            };
    useEffect(() => {
			Object.keys(bookToShelfObj).length &&
				BooksAPI.update(bookToShelfObj.book, bookToShelfObj.shelf).then(() =>
					idUpdate(uuid())
				);
		}, [bookToShelfObj]);
	return (
		<div className='bookshelf'>
			<h2 className='bookshelf-title'>{title}</h2>
			<div className='bookshelf-books'>
				<ol className='books-grid'>
					{books &&
						books.map((b) => (
							<Book key={b.id} bookData={b} handleShelf={handleShelf} />
						))}
				</ol>
			</div>
		</div>
	);
}
