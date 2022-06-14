import React,{useState,useEffect} from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from "../BooksAPI";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const Navigate = useNavigate();
    const [shelf1,setShelf1] = useState();
    const [shelf2,setShelf2] = useState();
    const [shelf3,setShelf3] = useState();
    const [idUpdate, setIdUpdate] = useState("");
    const [isInitial, setIsInitial] = useState(true);

    useEffect(() => {
			BooksAPI.getAll().then((data) => {
				setShelf1(data.filter((b) => b.shelf === "currentlyReading"));
				setShelf2(data.filter((b) => b.shelf === "wantToRead"));
				setShelf3(data.filter((b) => b.shelf === "read"));
			});
		}, [idUpdate]);
    useEffect(()=>{
        idUpdate !== "" && setIsInitial(false);
    },[idUpdate])
  return (
		<div className='app'>
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>MyReads</h1>
				</div>
				<div className='list-books-content'>
					{(isInitial  || idUpdate !== "" ) && <div>
						<BookShelf title='Currently Reading' books = {shelf1} idUpdate={(id)=>setIdUpdate(id)}/>
						<BookShelf title='Want to Read' books = {shelf2} idUpdate={(id)=>setIdUpdate(id)}/>
						<BookShelf title='Read' books = {shelf3} idUpdate={(id)=>setIdUpdate(id)}/>
					</div>}
				</div>
				<div className='open-search'>
					<button onClick={() => Navigate("/search")}>Add a book</button>
				</div>
			</div>
		</div>
	);
}
