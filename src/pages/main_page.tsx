import { useFetch } from "../hooks/useRequest"
import { useStore } from 'effector-react'
import { $books, updateBooks } from "../effector/books"
import { useEffect } from "react"
import LinearProgress from '@mui/material/LinearProgress';
import BookCard from "../components/BookCard";
import SelectViewMode from "../components/SelectViewMode";

export const MainPage = () => {
    const { loader, request } = useFetch()
    const books = useStore($books)

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        const books = await request({ url: 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDrEmuaPcEbdKK38NTjnSZHWfRe75bttts' })
        updateBooks(books?.items?.map((item: any) => item.volumeInfo))
    }

    return (
        <div>
            {!!loader && <LinearProgress />}
            <SelectViewMode />
            <div className="flex flex-row flex-wrap">
                {books.map((book, index) => <BookCard key={index} book={book} />)}
            </div>
        </div>
    )
}