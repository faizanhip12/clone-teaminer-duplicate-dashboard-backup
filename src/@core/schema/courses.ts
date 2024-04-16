// ** Third Party Imports
import * as yup from 'yup'

export default {
  add: yup.object().shape({
    title: yup.string().required('Title is required').min(5).max(70),
    description: yup.string().required('Description is required').min(5).max(2000),
    thumbnail_url: yup.string().required('Thumbnail is required'),
    playlistId: yup.string().required('Playlist Id is required'),
    subtitles: yup
      .array()
      .of(
        yup.object().shape({
          text: yup.string(),
          start: yup.string(),
          end: yup.string()
        })
      )
      .required()
  })
}
