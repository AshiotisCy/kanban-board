import { GET_KANBANS } from "../graphql/Queries";

const DeleteTask = (deleteItem, columnId, taskId, setTaskInfoVisible, kanbanId) => {
    deleteItem({
        variables: {
          columnId: columnId,
          taskId: taskId,
          kanbanId
        },
        refetchQueries: () => [{
          query: GET_KANBANS
        }]
      })
      setTaskInfoVisible(false)
}

export default DeleteTask;