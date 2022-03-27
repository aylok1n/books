import { useFetch } from "../hooks/useRequest"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import { Book } from "../interfaces";

export const BookPage = () => {
    const { loader, request } = useFetch()
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null)

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        const books = await request({ url: 'https://www.googleapis.com/books/v1/volumes?q=:keyes&key=AIzaSyDrEmuaPcEbdKK38NTjnSZHWfRe75bttts' })
        setBook(books.items.find((item: any) => item.id === id?.slice(1)))
    }



    return (
        <div>
            {!!loader && <LinearProgress />}
            {JSON.stringify(book)}
        </div>
    )
}