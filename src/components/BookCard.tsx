import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Book } from '../interfaces';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function BookCard({ book }: { book: Book }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: 345, margin: 3 }}>
            <CardMedia
                component="img"
                height="195"
                image={book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail}
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary">{book.title}</Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{book.subtitle}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Authors: {book?.authors?.join()}</Typography>
                    <Typography paragraph>{book.description}</Typography>
                    <Typography paragraph>Published: {book?.publishedDate?.toLocaleString()}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}