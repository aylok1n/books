import { useFetch } from "../hooks/useRequest"
import { useStore } from 'effector-react'
import { $books, updateBooks } from "../effector/books"
import { useEffect } from "react"
import LinearProgress from '@mui/material/LinearProgress';

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
            {JSON.stringify(books)}
        </div>
    )
}