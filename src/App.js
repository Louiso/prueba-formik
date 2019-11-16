import React from 'react';
import { TextField as MuiTextField, Button, Box, List } from '@material-ui/core'
import { Formik, useField } from 'formik';
import * as yup from 'yup'

const TextField = (props) => {
  const [field, meta] = useField(props)
  return (
    <MuiTextField {...field} helperText={meta.error} error={!!meta.error} />
  )
}


const Form = ({ form }) => {
  const { values, handleSubmit } = form
  return (
    (
      < form onSubmit={handleSubmit} >
        <List>
          {values.books && values.books.map((book, index) => {
            const name = `books.${index}`
            return (
              <Box key={index}>
                <TextField name={`${name}.title`} />
                <TextField name={`${name}.author`} />
                <Box>
                  <List>
                    {book.likes.map((like, index) => {
                      const likeName = `${name}.likes.${index}`
                      return (
                        <Box key={index}>
                          <TextField name={`${likeName}.user`} />
                          <TextField name={`${likeName}.text`} />
                        </Box>
                      )
                    })}
                  </List>
                </Box>
              </Box>
            )
          })}
        </List>
        <TextField name="book.title" />
        <TextField name="book.author" />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Enviar
        </Button>
      </form >
    )
  )
}

// const handleTest = debounce((value) => {
//   console.log(value)
// }, 600)

function App() {
  return (
    <Formik
      initialValues={{
        books: [{
          title: 'Sera',
          author: 'Luis Alfredo',
          likes: [{
            user: 'Ana Cristina',
            text: 'Me gusto'
          }]
        }, {
          title: 'Hola',
          author: 'Jose Armando',
          likes: [{
            user: 'Luis Alfredo',
            text: 'Que es esto'
          }, {
            user: 'Lo peor que he leido',
            text: 'No mames'
          }]
        }],
        book: {
          title: '',
          author: ''
        }
      }}
      onSubmit={({ books, book }) => {
        console.log(books, book)
      }}
      validationSchema={yup.object({
        books: yup.array().of(yup.object().shape({
          title: yup.string(),
          author: yup.string(),
          likes: yup.array().of(yup.object().shape({
            user: yup.string(),
            text: yup.string()
          }))
        })),
        book: yup.object({
          title: yup.string().required("Titulo requerido"),
          author: yup.string().required()
        })
      }).test((values, o) => {
        console.log(o)
        console.log(values)
      })}
    >
      {(form) => <Form form={form} />}
    </Formik >
  );
}

export default App;
