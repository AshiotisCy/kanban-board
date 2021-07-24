import { GET_KANBANS } from "../graphql/Queries";

const UpdateColumnName = (updateColumn, columnId, kanbanId, setColumnData, setColumnNameVisible) => {
    // The reason i went with this approach in to show an altenative way of actually retrieving the column Name.
    // A different example can be found in the UpdateTask.js file where i pass the arguments from the App.js using the onChange(event)
    let columnName = document.getElementById('columnName')?.value 
    updateColumn({
        variables: {
            id: columnId,
            name: columnName,
            kanbanId: kanbanId
        },
        refetchQueries: () => [{
            query: GET_KANBANS
        }]
    })

    setColumnData(columnName)
    setColumnNameVisible(false)

}


export default UpdateColumnName