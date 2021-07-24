const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const columns = require("../mockData/MOCK_DATA.json");
const { v4 } = require("uuid");

const kanbans = [];

const typeDefs = `
    type Column {
        id: ID
        name: String
        items: [ItemType]
    }

    type Kanban {
      id:ID
      name: String
      columns: [Column]
    }

    type ItemType {
        id: ID
        taskTitle: String
        shortDescription: String
        longDescription: String
        created: String
        lastModified: String
    }

    input ColumnTypeInput {
      id: ID
      name: String
      items: [ItemTypeInput]
    }

    input ItemTypeInput {
      id: ID
      taskTitle: String
      shortDescription: String
      longDescription: String
      created: String
      lastModified: String
    }

    input DragNDropItemType {
      droppableId: ID
      index: Int
    }

    type Query {
      getKanbans: [Kanban]
    }

    type Mutation {
      addKanban(name:String, columns: [ColumnTypeInput] ): Kanban
      deleteKanban(id: ID): Kanban
      updateKanban(id: ID, name: String): Kanban
      addColumn(kanbanId: ID name: String, items: [ItemTypeInput]): Column
      deleteColumn(id: ID, kanbanId: ID): Column
      updateColumn(id: ID, name: String, kanbanId: ID): Column
      addItem(columnId: ID kanbanId: ID): ItemType
      deleteItem(columnId: ID, taskId: ID kanbanId: ID): ItemType
      updateItem(id: ID, taskId: ID, taskTitle: String, shortDescription: String, longDescription: String kanbanId: ID): ItemType
      dragItem(draggableId: ID source: DragNDropItemType destination: DragNDropItemType kanbanId: ID): Column
    }
`

const resolvers = {
  Query: {
    getKanbans: () => kanbans
  },

  Mutation: {
    addKanban: (obj, args) => {
      const id = v4()
      const columns = []
      const name = "New Kanban"

      const NewKanban = {
        id,
        name,
        columns
      }

      kanbans.push(NewKanban);
      return kanbans;
    },

    deleteKanban: (obj, args) => {
      const { id } = args;
      const kanbanIndex = kanbans.findIndex(kanban => kanban.id === id);
      kanbans.splice(kanbanIndex, 1);
      return kanbans
    },

    updateKanban: (obj, args) => {
      const { id, name } = args;
      const columnIndex = kanbans.findIndex(index => index.id === id);
      kanbans[columnIndex].name = name

      return kanbans
    },

    addColumn: (obj, args) => {
      const { kanbanId } = args
      const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
      const id = v4()
      const items = []
      const name = "New Column"

      const newColumn = {
        id,
        name,
        items
      }
      kanbans[kanbanIndex].columns.push(newColumn);
      return newColumn;
    },

    deleteColumn: (obj, args) => {
      const { id, kanbanId } = args;
      const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
      const columnIndex = kanbans[kanbanIndex].columns.findIndex(index => index.id === id);
      kanbans[kanbanIndex].columns.splice(columnIndex, 1);
      return kanbans;
    },

    updateColumn: (obj, args) => {
      const { id, name, kanbanId } = args;
      const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
      const columnIndex = kanbans[kanbanIndex].columns.findIndex(index => index.id === id);
      kanbans[kanbanIndex].columns[columnIndex].name = name

      return kanbans
    },

    addItem: (obj, args) => {
      const { columnId, kanbanId } = args;
      const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
      const columnIndex = kanbans[kanbanIndex].columns.findIndex(index => index.id === columnId);
      const id = v4();
      const taskTitle = 'New Task'
      const shortDescription = ''
      const longDescription = ''
      const currentDate = new Date();
      const dateTime = currentDate.getDate() + "/"
        + (currentDate.getMonth() + 1) + "/"
        + currentDate.getFullYear() + " @ "
        + (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours() + ":"
        + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes() + ":"
        + (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();

      const created = dateTime;
      const lastModified = dateTime;

      const newItem = {
        id,
        taskTitle,
        shortDescription,
        longDescription,
        created,
        lastModified
      }

      kanbans[kanbanIndex].columns[columnIndex].items.push(newItem);
      return newItem;

    },

    deleteItem: (obj, args) => {
      const { columnId, taskId, kanbanId } = args;
      const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
      const columnIndex = kanbans[kanbanIndex].columns.findIndex(index => index.id === columnId);
      const itemPosition = kanbans[kanbanIndex].columns[columnIndex].items.findIndex(position => position.id === taskId);

      kanbans[kanbanIndex].columns[columnIndex].items.splice(itemPosition, 1);
      return kanbans[kanbanIndex].columns[columnIndex].items;
    },

    updateItem: (obj, args) => {
      const { id, taskId, taskTitle, shortDescription, longDescription, kanbanId } = args
      const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
      const columnIndex = kanbans[kanbanIndex].columns.findIndex(index => index.id === id);
      const itemPosition = kanbans[kanbanIndex].columns[columnIndex].items.findIndex(position => position.id === taskId);
      const currentDate = new Date();
      const dateTime = currentDate.getDate() + "/"
        + (currentDate.getMonth() + 1) + "/"
        + currentDate.getFullYear() + " @ "
        + (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours() + ":"
        + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes() + ":"
        + (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
      const item = kanbans[kanbanIndex].columns[columnIndex].items[itemPosition];
      item.taskTitle = taskTitle;
      item.shortDescription = shortDescription;
      item.longDescription = longDescription;
      item.lastModified = dateTime;

      return item;
    },

    dragItem: (obj, args) => {
      const { draggableId, source, destination, kanbanId } = args
      if (!destination) return;
      const kanbanIndex = kanbans.findIndex(position => position.id === kanbanId)
      const sourceColumnPosition = kanbans[kanbanIndex].columns.findIndex(columnId => columnId.id === source.droppableId)
      const destinationColumnPosition = kanbans[kanbanIndex].columns.findIndex(columnId => columnId.id === destination.droppableId)

      if (source.droppableId !== destination.droppableId) {

        const sourceColumn = kanbans[kanbanIndex].columns[sourceColumnPosition];

        const sourceItemPosition = sourceColumn.items.findIndex(itemId => itemId.id === draggableId)

        const sourceItems = sourceColumn.items.find(item => item.id === draggableId)

        kanbans[kanbanIndex].columns[sourceColumnPosition].items.splice(sourceItemPosition, 1)

        kanbans[kanbanIndex].columns[destinationColumnPosition].items.splice(destination.index, 0, sourceItems)
      }

      else {
        const column = kanbans[kanbanIndex].columns[sourceColumnPosition];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        kanbans[kanbanIndex].columns[sourceColumnPosition].items = [...copiedItems]
      }
    }
  }
}

const PORT = 4000;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({
  app,
  path: '/graphql'
})

app.listen(PORT, () => {
  console.log(`Server is running in localhost:${PORT}${server.graphqlPath}`)
})