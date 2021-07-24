import { GET_KANBANS } from "../graphql/Queries";

const UpdateTask = (updateItem, id, taskId, taskTitle, shortDescription, longDescription, setIsModalVisible, kanbanId) => {

    updateItem({
        variables: {
            id,
            taskId,
            taskTitle,
            shortDescription,
            longDescription,
            kanbanId
        },
        refetchQueries: () => [{
            query: GET_KANBANS
        }]
    })

    setIsModalVisible(false)
}



export default UpdateTask