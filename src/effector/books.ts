import { createStore, createEvent } from "effector";

export const updateBooks = createEvent();

export const $books = createStore([])
    .on(updateBooks, (_, next) => next)