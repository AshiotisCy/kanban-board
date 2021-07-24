import { GET_KANBANS } from "../graphql/Queries";

const addTask = (addItem, columnId, setColumnId, kanbanId) => {
  addItem({
    variables: {
      columnId,
      kanbanId
    },
    refetchQueries: () => [{
      query: GET_KANBANS
    }]
  })
  setColumnId(columnId)
}

export default addTask;