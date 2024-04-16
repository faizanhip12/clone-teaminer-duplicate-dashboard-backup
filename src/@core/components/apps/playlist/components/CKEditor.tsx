// @ts-nocheck

import React, { useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { usePlaylist } from 'src/@core/hooks/apps/usePlaylist'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

interface CKeditorProps {
  editorLoaded: boolean | any
  setValue: any
  serviceId: string
}

export default function CKeditor({ editorLoaded, setValue, serviceId }: CKeditorProps) {
  const { store } = usePlaylist(null)
  const { isDrawerOpen } = useToggleDrawer(null)
  const ckEditorInstanceRef = useRef(null)

  const handleEditorReady = editor => {
    ckEditorInstanceRef.current = editor
  }

  useEffect(() => {
    if (!isDrawerOpen && !serviceId && ckEditorInstanceRef.current) {
      const editor = ckEditorInstanceRef.current
      editor.setData('')
    }
  }, [isDrawerOpen, serviceId])

  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={serviceId ? store?.entity?.description || '' : ''}
          onChange={(event, editor) => {
            const data = editor.getData()
            setValue('description', data)
          }}
          onReady={editor => handleEditorReady(editor)}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'color',
              'mediaEmbed',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              'blockQuote'
            ]
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  )
}
