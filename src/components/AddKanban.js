import { GET_KANBANS } from "../graphql/Queries";
const addNewKanban = (addKanban, setKanbanId) => {
    addKanban({
        variables: {
            name: ''
        },
        refetchQueries: () => [{
            query: GET_KANBANS
        }]
    })

    setKanbanId('')

}

export default addNewKanban