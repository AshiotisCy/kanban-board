import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Modal, Input, Popconfirm, Tooltip } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import addTask from './components/AddTask'
import addNewKanban from './components/AddKanban'
import DeleteKanban from "./components/DeleteKanban";
import AddColumn from './components/AddColumn'
import DeleteTask from "./components/DeleteTask";
import DeleteColumn from "./components/DeleteColumn";
import UpdateTask from "./components/UpdateTask";
import UpdateColumnName from "./components/UpdateColumnName";
import UpdateKanbanName from "./components/UpdateKanbanName";
import onDragEnd from "./components/DragItems";
import DisplayTaskInfo from "./components/DisplayTaskInfo"
import { useQuery, } from "@apollo/client";
import { useMutation } from '@apollo/client';
import { ADD_COLUMN, DELETE_COLUMN, UPDATE_COLUMN, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, DRAG_ITEM, ADD_KANBAN, DELETE_KANBAN, UPDATE_KANBAN } from "./graphql/Mutations"
import { GET_KANBANS } from "./graphql/Queries";
import './css/App.css'
import './css/SideMenu.css'




function App() {
  const [columns, setColumns] = useState([]);
  const [kanbans, setKanbans] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [taskInfoVisible, setTaskInfoVisible] = useState(false)
  const [isEditColumnNameVisible, setColumnNameVisible] = useState(false)
  const [isKanbanModalVisible, setKanbanModalVisible] = useState(false)
  const [kanbanId, setKanbanId] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [shortDescription, setTaskShortDescription] = useState('')
  const [longDescription, setTaskLondDescription] = useState('')
  const [columnId, setColumnId] = useState({})
  const [itemObject, setItemObject] = useState([])
  const [columnData, setColumnData] = useState('')
  const [columnName, setColumnName] = useState('')
  const [kanbanName, setKanbanName] = useState('')
  const [kanbanIndex, setKanbanIndex] = useState(0)

  const { error, loading, data } = useQuery(GET_KANBANS)

  const [addKanban] = useMutation(ADD_KANBAN)
  const [addColumn] = useMutation(ADD_COLUMN)
  const [deleteColumn] = useMutation(DELETE_COLUMN)
  const [deleteKanban] = useMutation(DELETE_KANBAN)
  const [updateColumn] = useMutation(UPDATE_COLUMN)
  const [addItem] = useMutation(ADD_ITEM)
  const [updateItem] = useMutation(UPDATE_ITEM)
  const [deleteItem] = useMutation(DELETE_ITEM)
  const [dragItem] = useMutation(DRAG_ITEM)
  const [updateKanban] = useMutation(UPDATE_KANBAN)

  useEffect(() => {
    setKanbans(data?.getKanbans)
    setColumns(data?.getKanbans[kanbanIndex]?.columns)
    // console.log(data)

  }, [data])

  useEffect(() => {
    console.log("kanbanIndex", kanbanIndex)
    setColumns(data?.getKanbans[kanbanIndex]?.columns)
    console.log(kanbans)
  }, [kanbanIndex])

  const handleCancel = () => {
    setIsModalVisible(false)
    setColumnNameVisible(false)
    setTaskInfoVisible(false)
    setKanbanModalVisible(false)
  }

  const handleColumnName = (column) => {
    setColumnData(column)
    setColumnName(column.name)
    setColumnNameVisible(true)
  }

  const handleKanbanName = (kanban) => {
    setKanbanName(kanban.name)
    setKanbanId(kanban.id)
    setKanbanModalVisible(true)
  }

  const EditTask = (columnId, item) => {
    setColumnId(columnId)
    setItemObject(item)
    setTaskTitle(item.taskTitle)
    setTaskShortDescription(item.shortDescription)
    setTaskLondDescription(item.longDescription)
    setIsModalVisible(true)
  }

  const ItemInformation = (column, columnId, item) => {
    setColumnId(columnId)
    setColumnData(column)
    setItemObject(item)
    setTaskInfoVisible(true)
  }

  const DisplayColumns = (kanbanId) => {
    setKanbanId(kanbanId)
    const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
    setKanbanIndex(kanbanIndex)
    // console.log("index", kanbanIndex)
  }


  return (
    <div className='App'>
      {/* {console.log("columns", columns)} */}
      <div className='container-fluid'>
        <div className='AppContainer row'>
          <div className='SideMenu col-md-2'>
            <div className='SideMenuHeader'>
              <div className='SideMenu-Title'>
                Kanban Boards
              </div>
              {kanbans !== undefined && kanbans.map((kanban, index) => {
                return (
                  <div key={kanban.id} className='kanban-sideMenu'>
                    <div className='kanban-sideMenu-button-wrap row'>
                      <div className='col-10'>
                        <Button className='kanban-Button' onClick={() => DisplayColumns(kanban.id)} >
                          {kanban.name}
                        </Button>
                      </div>
                      <div className='SideMenuIcons col-2'>
                        <DeleteOutlined className='delete-kanban' onClick={() => DeleteKanban(deleteKanban, kanban.id, setKanbanId)} />
                        <EditOutlined className='edit-kanban' onClick={() => handleKanbanName(kanban)} />
                      </div>
                    </div>
                  </div>
                )
              })

              }
              <div className='CreateKanban'>
                <Button onClick={() => addNewKanban(addKanban, setKanbanId)}>
                  <PlusOutlined />
                  <div className='CreateKanbanTitle'>Create Kanban</div>
                </Button>
              </div>

            </div>
          </div>
          <div className='MainPage col-md-10'>
            {(columns !== undefined || columns !== []) &&
              <DragDropContext onDragEnd={result => onDragEnd(dragItem, result, kanbanId)}>

                <div className='AddColumnsButton row'>
                  <div className='col-12'>
                    {kanbanId ?
                      <Button onClick={() => AddColumn(addColumn, kanbanId)}>
                        <PlusOutlined />
                        <div className='AddColumns'>Add Column</div>
                      </Button>
                      :
                      <div className='SelectAKanban'>
                        <h1>Please select a Kanban</h1>
                      </div>
                    }
                  </div>
                </div>


                <div className='row'>
                  {kanbanId && columns !== undefined && columns.map((column, index) => {
                    return (
                      <div className='ColumnsRendered col-md-3' key={column.id}>
                        <div className='ColumnItem row'>
                          <div className='ColumnName col-md-10'>
                            <h4>{column.name}</h4>
                          </div>
                          <div className='ColumnNameButton col-md-2'>
                            <Popconfirm
                              className='DeleteColumn'
                              title='If you delete the column all the task will be deleted as well. Are you sure? -.^'
                              onConfirm={() => DeleteColumn(deleteColumn, column.id, kanbanId)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <DeleteOutlined />
                            </Popconfirm>
                            <Button className='EditColumnName' onClick={() => handleColumnName(column)} >
                              <EditOutlined />
                            </Button>
                          </div>
                        </div>
                        <div className='Column'>
                          <Droppable droppableId={column.id} key={column.id}>
                            {(provided, snapshot) => {
                              return (
                                <div className='DroppableColumn'
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    background: snapshot.isDraggingOver
                                      ? "lightblue"
                                      : "lightgrey"
                                  }}
                                >
                                  {column.items.map((item, index) => {
                                    return (
                                      <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                      >
                                        {(provided, snapshot) => {
                                          return (
                                            <div className='DraggableItem'
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                backgroundColor: snapshot.isDragging
                                                  ? "#263B4A"
                                                  : "#456C86",
                                                color: "white",
                                                ...provided.draggableProps.style
                                              }}
                                            >
                                              <div className='TaskItem row'>
                                                <div className='GroupTask col-md-10'>
                                                  <div className='TaskItemTitle'>
                                                    <Tooltip placement="right" title={'Click to view Task Information'}>
                                                      <a
                                                        onClick={() => ItemInformation(column, column.id, item)}>
                                                        {item.taskTitle}
                                                      </a>
                                                    </Tooltip>
                                                  </div>

                                                  <div className='TaskItemComment'>
                                                    {item.shortDescription}
                                                  </div>
                                                </div>
                                                <div className='TaskItemEditButton col-md-2'>
                                                  <Popconfirm
                                                    className='DeleteTask'
                                                    title='Are you sure you want to delete this task?'
                                                    onConfirm={() => DeleteTask(deleteItem, column.id, item.id, setTaskInfoVisible, kanbanId)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                  >
                                                    <DeleteOutlined />
                                                  </Popconfirm>
                                                  <Button className='EditTask' onClick={() => EditTask(column.id, item)} >
                                                    <EditOutlined />
                                                  </Button>

                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                  })}
                                  <div className='CreateTaskButton'>
                                    <Button onClick={() => addTask(addItem, column.id, setColumnId, kanbanId)}>
                                      <PlusOutlined />
                                      <div className='CreateTaskButtonTitle'>Create Task</div>
                                    </Button>
                                  </div>
                                </div>
                              );
                            }}
                          </Droppable>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DragDropContext>
            }

            <Modal
              key={columnData.id}
              title='Edit Column Name'
              visible={isEditColumnNameVisible}
              onCancel={handleCancel}
              footer={[
                <Button key='cancel' onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key='update' onClick={() => UpdateColumnName(updateColumn, columnData.id, kanbanId, setColumnData, setColumnNameVisible)}>
                  Update
                </Button>
              ]}>
              <div className='UpdateColumnName'>
                <div className='ColumnName'>
                  <h5>Column Name</h5>
                </div>
                <Input id='columnName' type='text' placeholder={columnName === '' ? 'Please enter a name for your column' : columnName} />
              </div>
            </Modal>
            <Modal
              key={itemObject.id}
              title='Task Edit'
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button key='cancel' onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key='update' onClick={() => UpdateTask(updateItem, columnId, itemObject?.id, taskTitle, shortDescription, longDescription, setIsModalVisible, kanbanId)}>
                  Update
                </Button>
              ]}>
              <div className='UpdateTaskName'>
                <div className='UpdateTaskNameTitle'>
                  <h5>Task Name</h5>
                </div>
                <Input id='taskName' type='text' placeholder={taskTitle ?? 'Please enter your task name'} onChange={(event) => setTaskTitle(event.target.value)} />
              </div>
              <div className='UpdateTaskDescription'>
                <div className='Description'>
                  <h5>Short Description</h5>
                </div>
                <Input id='taskDescription' type='text' placeholder={shortDescription ?? 'Please enter your task description'} onChange={(event) => setTaskShortDescription(event.target.value)} />
              </div>
              <div className='UpdateLongDescription'>
                <h5>Task Description</h5>
                <Input.TextArea id='longDescription' placeholder={longDescription ?? 'Please enter your task description'} onChange={(event) => setTaskLondDescription(event.target.value)} />
              </div>
            </Modal>
            <Modal
              title='Task Information'
              visible={taskInfoVisible}
              onCancel={handleCancel}
              footer={[
                <Button key='cancel' onClick={handleCancel}>
                  Close
                </Button>,
                <Button key='delete' onClick={() => DeleteTask(deleteItem, columnId, itemObject.id, setTaskInfoVisible, kanbanId)}>
                  Delete
                </Button>
              ]}
            >
              {DisplayTaskInfo(columnData, itemObject)}
            </Modal>
            <Modal
              key={kanbanId}
              title='Edit Kanban Title'
              visible={isKanbanModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button key='cancel' onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key='update' onClick={() => UpdateKanbanName(updateKanban, kanbanId, setKanbanName, setKanbanModalVisible)}>
                  Update
                </Button>
              ]}>
              <div className='UpdateColumnName'>
                <div className='ColumnName'>
                  <h5>Kanban Title</h5>
                </div>
                <Input id='kanbanTitle' type='text' placeholder={kanbanName === '' ? 'Please enter a Kanban Title' : kanbanName} />
              </div>
            </Modal>
          </div>
        </div >
      </div>
    </div>
  );
}

export default App;
