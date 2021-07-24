import { v4 as uuid } from 'uuid';

const datetime = document.lastModified

export const itemsFromBackend = [
    { id: uuid(), taskTitle: "First task", shortDescription: "", longDescription: '', created:  datetime, lastModified: datetime },
    { id: uuid(), taskTitle: "Second task", shortDescription: "", longDescription: '', created: datetime, lastModified: datetime },
    { id: uuid(), taskTitle: "Third task", shortDescription: "", longDescription: '', created: datetime, lastModified: datetime },
    { id: uuid(), taskTitle: "Fourth task", shortDescription: "", longDescription: '', created: datetime, lastModified: datetime },
    { id: uuid(), taskTitle: "Fifth task", shortDescription: "", longDescription: '', created: datetime, lastModified: datetime }
];

export const columnList = [
    {
        id: uuid(),
        name: "Requested",
        items: itemsFromBackend
    },
    {
        id: uuid(),
        name: "To-Do",
        items: []
    },
    {
        id: uuid(),
        name: "In Progress",
        items: []
    },
    {
        id: uuid(),
        name: "Done",
        items: []
    }
]

export const kanbanBoard = [
    {
        id: uuid(),
        name: "kanban1",
        columns: columnList
    },
    {
        id: uuid(),
        name: "kanban2",
        columns: []
    }
]