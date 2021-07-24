import { GET_KANBANS } from "../graphql/Queries";

const onDragEnd = (dragItem, result, kanbanId) => {
  dragItem({
    variables: {
      draggableId: result.draggableId,
      source: result.source,
      destination: result.destination,
      kanbanId
    },
    refetchQueries: () => [{
      query: GET_KANBANS
    }]
  })
}

export default onDragEnd