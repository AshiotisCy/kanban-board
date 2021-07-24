import { gql } from "@apollo/client"

export const ADD_COLUMN = gql`

    mutation addColumn($name: String!, $kanbanId: ID) {
        addColumn(name: $name, kanbanId: $kanbanId) {
            id
            name
            items{
                id
                taskTitle
                shortDescription
                longDescription
                created
                lastModified
            }
        }
    }
`

export const DELETE_COLUMN = gql`
    mutation deleteColumn($id: ID! $kanbanId: ID) {
        deleteColumn(id: $id kanbanId: $kanbanId){
            id
        }
    }
`

export const UPDATE_COLUMN = gql`
    mutation updateColumn($id: ID $name: String, $kanbanId: ID){
        updateColumn(id: $id name: $name kanbanId: $kanbanId){
            name
        }
    }
`

export const ADD_ITEM = gql`
    mutation addItem($columnId: ID $kanbanId: ID){
        addItem(columnId: $columnId kanbanId: $kanbanId) {
            id,
            taskTitle,
            shortDescription,
            longDescription,
            created,
            lastModified
        }
    } 
`

export const UPDATE_ITEM = gql`
    mutation updateItem($id: ID $taskId: ID $taskTitle: String, $shortDescription: String $longDescription: String, $kanbanId: ID) {
        updateItem(
            id: $id 
            taskId: $taskId 
            taskTitle: $taskTitle
            shortDescription: $shortDescription
            longDescription: $longDescription
            kanbanId: $kanbanId
            ) {
                id
                taskTitle
                shortDescription
                longDescription
                created
                lastModified
            }
    }
`

export const DELETE_ITEM = gql`
    mutation deleteItem($columnId: ID, $taskId: ID, $kanbanId: ID){
        deleteItem(columnId: $columnId taskId: $taskId kanbanId: $kanbanId){
            id
            taskTitle
        }
    }
`

export const DRAG_ITEM = gql`
    mutation dragItem($draggableId: ID $source: DragNDropItemType $destination: DragNDropItemType $kanbanId: ID) {
        dragItem(draggableId: $draggableId source: $source destination: $destination kanbanId: $kanbanId) {
            id
            name
        }
    }
`

export const ADD_KANBAN = gql`
    mutation addKanban($name: String) {
        addKanban(name: $name) {
            id
            name
            columns {
                id
                name
                items{
                    id
                    taskTitle
                    shortDescription
                    longDescription
                    created
                    lastModified
                }
            }
        }
    }
`
export const DELETE_KANBAN = gql`
    mutation deleteKanban($id: ID!) {
        deleteKanban(id: $id){
            id
        }
    }
`
export const UPDATE_KANBAN = gql`
    mutation updateKanban($id: ID $name: String) {
        updateKanban(id :$id name: $name) {
            id
            name
        }
    }
`