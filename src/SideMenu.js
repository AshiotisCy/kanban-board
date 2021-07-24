// import { Button } from 'antd'
// import { PlusOutlined } from '@ant-design/icons';
// import './SideMenu.css'



// const kanbans = [
//     {
//         name: 'kanban1'
//     },
//     {
//         name: 'kanban2'
//     }
// ]

// const addKanban = (kanban) => {
//     kanbans.push(
//         kanban
//     )
// }

// function SideMenu() {
    

//     return (
//         <div className='SideMenuHeader'>
//             <div className='SideMenu-Title'>
//                 Kanban Boards
//             </div>
//             {kanbans !== undefined && kanbans.map((kanban, index) => {
//                 return (
//                     <div className='kanban-sideMenu'>
//                         <Button className='kanban-Button' onClick={() => addKanban(kanban)}>
//                             {kanban.name}
//                         </Button>
//                     </div>
//                 )
//             })

//             }
//             <div className='CreateKanban'>
//                 <Button onClick={() => { }}>
//                     <PlusOutlined />
//                     <div className='CreateKanbanTitle'>Create Kanban</div>
//                 </Button>
//             </div>

//         </div>
//     )

// }

// export default SideMenu