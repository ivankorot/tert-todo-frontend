import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation ($text: String!) {
    createToDo(text: $text) {
        name
        id
    }
  }
`

export const TOGGLE_TODO = gql`
  mutation ($isCompleted: Boolean!, $id: Float!) {
    markToDoCompleted(isCompleted: $isCompleted, id: $id)
  }
`

export const DELETE_TODO = gql`
  mutation ($id: Float!) {
    deleteToDo(id: $id) 
  }
`

export const TODO_LIST = gql`
  query {
    listToDos {
        id
        name
    }
  }
`