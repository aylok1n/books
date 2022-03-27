import { useFetch } from "../hooks/useRequest"
import { useStore } from 'effector-react'
import { $books, updateBooks } from "../effector/books"
import { useEffect } from "react"
import LinearProgress from '@mui/material/LinearProgress';
import BookCard from "../components/BookCard";
import SelectViewMode from "../components/SelectViewMode";
import { Book } from "../interfaces";
import { $viewmode } from "../effector/viewMode";
import BooksTable from "../components/BooksTable";

export const MainPage = () => {
    const { loader, request } = useFetch()
    const books = useStore($books)
    const viewMode = useStore($viewmode)

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        const books = await request({ url: 'https://www.googleapis.com/books/v1/volumes?q=:keyes&key=AIzaSyDrEmuaPcEbdKK38NTjnSZHWfRe75bttts' })
        updateBooks(books?.items?.map((item: any) => {
            return {
                id: item.id,
                ...item.volumeInfo
            }
        }))
    }

    const renderBooks = () => {
        if (viewMode === 'cards') return <div className="flex flex-row flex-wrap">
            {books.map((book: Book, index: number) => <BookCard key={index} book={book} />)}
        </div>
        else if (viewMode === 'table') return <BooksTable books={books} />
    }

    return (
        <div>
            {!!loader && <LinearProgress />}
            <SelectViewMode />
            {renderBooks()}
        </div>
    )
}