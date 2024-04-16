// ** Third Party Imports
import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().min(3).max(50, 'Name must be at most 70 characters').required(),
    description: yup.string().min(3).max(500, 'Description must be at most 1000 characters').required(),
    thumbnail: yup.string().required('Thumbnail Is Required'),
    country: yup.string().required('Country Is Required'),
    language: yup.string().required('language Is Required'),
    timeZone: yup.string().required('timeZone Is Required'),
  })
}
