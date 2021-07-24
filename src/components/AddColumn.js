import { GET_KANBANS } from "../graphql/Queries";
const AddColumn = (addColumn, kanbanId) => {
    addColumn({
        variables: {
            name: '',
            kanbanId
        },
        refetchQueries: () => [{
            query: GET_KANBANS
        }]
    })

}

export default AddColumn