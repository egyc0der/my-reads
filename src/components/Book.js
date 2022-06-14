import React from 'react'
import { useEffect,useState } from 'react';
import * as BooksAPI from "../BooksAPI";


export default function Book({bookData,handleShelf}) {
    const [shelfVal,setShelfVal] = useState("");
    useEffect(()=>{
        !bookData.shelf &&
        BooksAPI.get(bookData.id).then((data) => setShelfVal(data.shelf));
    },[])
  return (
		bookData && (
			<li>
				<div className='book'>
					<div className='book-top'>
						<div
							className='book-cover'
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${
									bookData.imageLinks ? bookData.imageLinks.thumbnail : ""
								})`,
							}}
						></div>
						<div className='book-shelf-changer'>
							{shelfVal && (
								<select
									defaultValue={shelfVal}
									onChange={(e) => handleShelf(e.target.value, bookData)}
								>
									<option value='move' disabled>Move to...</option>
									<option value='currentlyReading'>Currently Reading</option>
									<option value='wantToRead'>Want to Read</option>
									<option value='read'>Read</option>
									<option value='none'>None</option>
								</select>
							)}
							{bookData.shelf && (
								<select
									defaultValue={bookData.shelf}
									onChange={(e) => handleShelf(e.target.value, bookData)}
								>
									<option value='move' disabled>Move to...</option>
									<option value='currentlyReading'>Currently Reading</option>
									<option value='wantToRead'>Want to Read</option>
									<option value='read'>Read</option>
									<option value='none'>None</option>
								</select>
							)}
						</div>
					</div>
					<div className='book-title'>{bookData.title}</div>
					{bookData.authors &&
						bookData.authors.map((author) => (
							<div key={author} className='book-authors'>
								{author}
							</div>
						))}
				</div>
			</li>
		)
	);
}
