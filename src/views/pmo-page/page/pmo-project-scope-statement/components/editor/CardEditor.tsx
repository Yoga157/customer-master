import React from 'react';
import { Card, Divider, Label } from 'semantic-ui-react';
import { Editor } from '@tinymce/tinymce-react';

interface IProps {
  className?: any;
  id?: string;
  title?: string | undefined;
  value?: string;
  editRef?: React.MutableRefObject<any>;
  handleUploadImage;
  height?: string | number;
  readonly: boolean;
  onEditorChange: (e) => any;
  handleLoadContent: any;
}
const CardEditor: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
  const { title, value, editRef, height, handleUploadImage, readonly, id, className, onEditorChange, handleLoadContent } = props;

  return (
    <Card.Content className={className?.class}>
      <Card.Header>{title}</Card.Header>
      {title ? <Divider /> : null}
      <Editor
        onInit={(evt, editor) => (editRef.current = editor)}
        // initialValue={value}
        value={value}
        disabled={readonly}
        id={id}
        init={{
          // placeholder: 'Type here...',
          height,
          content_css: '/indexForm.css',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px}',
          autosave_ask_before_unload: false,
          powerpaste_allow_local_images: true,
          menu: {
            // code: { title: 'Code', items: 'code' },
          },
          menubar: ' print code ',
          plugins:
            'help image code advlist anchor autolink codesample fullscreen lists link media preview searchreplace table template visualblocks wordcount ',
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent |' +
            'removeformat | table  | image | preview | help',
          // automatic_uploads: true,
          images_file_types: 'png,PNG,jpg,JPG,jpeg,JPEG,svg,webp',
          file_picker_types: 'image media',
          images_upload_handler: handleUploadImage,
          mobile: {
            toolbar_drawer: 'floating',
          },
          editable_class: 'mceEditable',
          noneditable_class: 'mceNonEditable',

          setup: (editor) => {
            editor.on('init', (e) => {
              let timer = setTimeout(() => {
                handleLoadContent(false);
              }, 4000);
              return () => {
                clearTimeout(timer);
              };
              //  handleLoadContent(false);
            });
          },
        }}
        onEditorChange={(newText) => onEditorChange(newText)}
      />
      {className && (
        <Label basic color="red" pointing style={{ position: 'absolute', zIndex: 10 }}>
          {className?.errMsg}
        </Label>
      )}
    </Card.Content>
  );
};

export default CardEditor;
