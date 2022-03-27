import { useFetch } from "../hooks/useRequest"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import { Book } from "../interfaces";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export const BookPage = () => {
    const { loader, request } = useFetch()
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null)
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState<any>(null)
    let navigate = useNavigate();
    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        const books = await request({ url: 'https://www.googleapis.com/books/v1/volumes?q=:keyes&key=AIzaSyDrEmuaPcEbdKK38NTjnSZHWfRe75bttts' })
        const currentBook = books.items.find((item: any) => item.id === id?.slice(1))?.volumeInfo
        setFormValue(currentBook)
        setBook(currentBook)
    }

    const save = () => {
        setBook(formValue)
        setOpen(false)
    }

    const close = () => {
        setOpen(false);
        setFormValue(book)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.name === 'authors' ? e.currentTarget.value.split(',') : e.currentTarget.value
        setFormValue({
            ...formValue,
            [e.currentTarget.name]: value
        })
    }

    return (
        <div>
            {!!loader && <LinearProgress />}
            {!!book && <div className="flex pt-4 relative items-center justify-center flex-row">
                <Button sx={{ position: 'absolute', left: 20, top: 20 }} onClick={() => navigate(-1)} size="small">Назад</Button>
                <CardMedia
                    component="img"
                    height="300"
                    width='200'
                    sx={{ width: 200, height: 300, margin: "0px 20px ", objectFit: 'contain' }}
                    image={book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail}
                    alt="book"
                />
                <Card sx={{ maxWidth: 600 }} >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            {book.subtitle}
                        </Typography>
                        <Typography paragraph>Authors: {book?.authors?.join()}</Typography>
                        <Typography paragraph>{book.description}</Typography>
                        <Typography paragraph>Published: {book?.publishedDate?.toLocaleString()}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleToggle} size="small">Edit</Button>
                    </CardActions>
                </Card>
            </div>}
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
