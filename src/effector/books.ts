import { createStore, createEvent } from "effector";
import { Book } from "../interfaces";

export const updateBooks = createEvent<Book[]>();

export const $books = createStore<Book[]>([])
    .on(updateBooks, (_, next) => next)