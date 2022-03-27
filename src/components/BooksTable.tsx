import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Book } from '../interfaces';
import { Link, useNavigate } from 'react-router-dom';

export default function BooksTable({ books }: { books: Book[] }) {
    let navigate = useNavigate();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Subtitle</TableCell>
                        <TableCell align="center">Authors</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Published</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book: Book, index: number) => (
                        <TableRow
                            onClick={() => navigate(`:${book.id}`)}
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                        >
                            <TableCell component="th" scope="row">
                                {book.title}
                            </TableCell>
                            <TableCell align="center">{book.subtitle}</TableCell>
                            <TableCell align="center">{book.authors?.join()}</TableCell>
                            <TableCell align="center">{book.description}</TableCell>
                            <TableCell align="center">{book.publishedDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}