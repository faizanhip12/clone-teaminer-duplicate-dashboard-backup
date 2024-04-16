// ** Third Party Imports
import * as yup from 'yup'

export default {
  add: yup.object().shape({
    title: yup.string().required('Title is required').min(2).max(30),
    thumbnail: yup.string().required('Thumbnail is required'),
  })
}
