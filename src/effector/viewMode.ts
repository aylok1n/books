import { createStore, createEvent } from "effector";
import { viewMode } from "../interfaces";

export const updateViewmode = createEvent<viewMode>();

export const $viewmode = createStore<viewMode>('cards')
    .on(updateViewmode, (_, next) => next)