import { gql } from '@apollo/client'


// export const GET_KANBANS = gql`
//     query {   
//         getColumns {
//             id
//             name
//             items{
//               id
//               taskTitle
//               shortDescription
//               longDescription
//               created
//               lastModified
//             }
//           }
//     }
// `

export const GET_KANBANS = gql`
    query {
      getKanbans{
        id
        name
        columns {
          id
          name
          items{
            id
            taskTitle
            shortDescription
            longDescription
            created
            lastModified
          }
        }
      }
    }
`