import { createStore, createEvent } from "effector";

export const updateViewmode = createEvent<'cards' | 'table'>();

export const $viewmode = createStore<'cards' | 'table'>('cards')
    .on(updateViewmode, (_, next) => next)