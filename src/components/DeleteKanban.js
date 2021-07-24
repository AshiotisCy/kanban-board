import { GET_KANBANS } from "../graphql/Queries";
const DeleteKanban = (deleteKanban, kanbanId, setKanbanId) => {
    deleteKanban({
        variables: {
            id: kanbanId
        },
        refetchQueries: () => [{
            query: GET_KANBANS
        }]
    })

    setKanbanId('')

}

export default DeleteKanban