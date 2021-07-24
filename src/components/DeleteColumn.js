import { GET_KANBANS } from "../graphql/Queries";

const DeleteColumn = (deleteColumn, columnId, kanbanId) => {
    deleteColumn({
        variables: {
            id: columnId,
            kanbanId
        },
        refetchQueries: () => [{
            query: GET_KANBANS
        }]
    })

}

export default DeleteColumn;