import { gql } from '@apollo/client';

export const CREATE_TODO_ITEM = gql`
  mutation ($id: Float!, $title: String!) {
    createToDoItem(id: $id, title: $title) {
        text
    }
  }
`


export const DELETE_TODO_ITEM = gql`
  mutation ($id: Float!) {
    deleteToDoItem(id: $id) 
  }
`

export const TODO_ITEMS_LIST = gql`
  query ($filter: String!, $id: Float!){
    getToDoItems(filter: $filter, id: $id) {
        id
        text
        isComplete
    }
  }
`