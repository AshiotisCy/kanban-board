import { GET_KANBANS } from "../graphql/Queries";

const UpdateKanbanName = (updateKanban, id, setKanbanName, setKanbanModalVisible) => {
    let kanbanName = document.getElementById('kanbanTitle')?.value 
    updateKanban({
        variables: {
            id,
            name: kanbanName
        },
        refetchQueries: () => [{
            query: GET_KANBANS
        }]
    })

    setKanbanName(kanbanName)
    setKanbanModalVisible(false)

}


export default UpdateKanbanName