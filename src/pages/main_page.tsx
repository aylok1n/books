import { useFetch } from "../hooks/useRequest"
import { useStore } from 'effector-react'
import { $books, updateBooks } from "../effector/books"
import { useEffect, useState } from "react"
import LinearProgress from '@mui/material/LinearProgress';
import BookCard from "../components/BookCard";
import SelectViewMode from "../components/SelectViewMode";
import { Book } from "../interfaces";
import { $viewmode } from "../effector/viewMode";
import BooksTable from "../components/BooksTable";
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


export const MainPage = () => {
    const { loader, request } = useFetch()
    const books = useStore($books)
    const viewMode = useStore($viewmode)
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState<any>(null)

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

    const save = () => {
        updateBooks([formValue, ...books])
        setOpen(false)
    }

    const close = () => {
        setOpen(false);
        setFormValue(null)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.name === 'authors' ? e.currentTarget.value.split(',') : e.currentTarget.value

        if (e.currentTarget.name === 'image') setFormValue({
            ...formValue,
            imageLinks: {
                thumbnail: value
            }
        })

        else setFormValue({
            ...formValue,
            [e.currentTarget.name]: value
        })
    }

    const renderBooks = () => {
        if (viewMode === 'cards') return <div className="flex flex-row flex-wrap">
            {books.map((book: Book, index: number) => <BookCard key={index} book={book} />)}
        </div>
        else if (viewMode === 'table') return <BooksTable books={books} />
    }

    return (
        <div className="relative">
            {!!loader && <LinearProgress />}
            <SelectViewMode />
            <Button sx={{ position: 'absolute', right: 50, top: 10 }} onClick={() => setOpen(true)} size="small">Добавить</Button>
            {renderBooks()}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <div className="flex p-3 bg-white flex-col" >
                    <Stack spacing={3}>
                        <TextField
                            name="title"
                            value={formValue?.title || ''}
                            onChange={handleChange}
                            id="outlined-basic"
                            label="Title"
                        />
                        <TextField
                            name="subtitle"
                            value={formValue?.subtitle || ''}
                            onChange={handleChange}
                            id="outlined-basic"
                            label="Subtitle"
                        />
                        <TextField
                            name="authors"
                            value={formValue?.authors?.join() || ''}
                            onChange={handleChange}
                            id="outlined-basic"
                            label="Authors"
                        />
                        <TextField
                            name="image"
                            value={formValue?.imageLinks?.thumbnail || ''}
                            onChange={handleChange}
                            id="outlined-basic"
                            label="Image url"
                        />
                        <TextField
                            name="description"
                            value={formValue?.description || ''}
                            onChange={handleChange}
                            id="outlined-basic"
                            label="Description"
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Published date"
                                inputFormat="MM/dd/yyyy"
                                value={formValue?.publishedDate || ''}
                                onChange={(date: any) => {
                                    setFormValue({
                                        ...formValue,
                                        publishedDate: date
                                    })
                                }}
                                renderInput={(params: any) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <Button onClick={save} size="small">Сохранить</Button>
                        <Button onClick={close} size="small">Отменить</Button>
                    </Stack >
                </div>
            </Backdrop>
        </div>
    )
}