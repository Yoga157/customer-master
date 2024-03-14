import './RichTextStyle.scss';
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Popup, Icon } from 'semantic-ui-react';
import { Editor } from '@tinymce/tinymce-react';
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const RichTextEditor: React.FC<IProps> = ({
  id: string = '',
  editorId = '',
  input,
  width,
  toolTipContents,
  placeholder,
  labelName,
  onChange,
  initialValues,
  values,
  minHeight = 200,
  mandatorys = true,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field className="LabelNameLabel" error={touched && !!error} width={width}>
      <div>
        <label>
          {labelName}
          <label hidden={mandatorys} style={{ color: 'red' }} className="mandatory">
            {' '}
            *
          </label>
        </label>
        {toolTipContents && (
          <Popup
            trigger={<Icon name="info" color="grey" size="small" circular />}
            hoverable
            content={
              <div className="ContainerMax200">
                <div>{toolTipContents}</div>
              </div>
            }
          />
        )}
      </div>

      <Editor
        {...rest}
        id={editorId}
        apiKey="2yqmz04j0q7jwgpltql5mwg808mh6bblofkcpi5ek8v913ws"
        initialValue={initialValues}
        init={{
          menubar: false,
          placeholder: placeholder,
          plugins:
            'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount autoresize ',
          autoresize_bottom_margin: 50,
          toolbar: ' bullist numlist outdent indent | ' + 'removeformat | help',
          content_css: 'https://www.tiny.cloud/css/codepen.min.css',
          content_css_cors: true,
          onchange_callback: 'myCustomOnChangeHandler',
          min_height: minHeight,
        }}
        onEditorChange={(content, editor) => {
          input.onChange(content);
        }}
        value={input.value}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default RichTextEditor;
