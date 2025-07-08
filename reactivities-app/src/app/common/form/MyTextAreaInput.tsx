import { ErrorMessage, Field, useField } from "formik";
import ReactQuill from "react-quill";
import { FormField, Label, Select } from "semantic-ui-react";
import 'react-quill/dist/quill.snow.css'

interface Props{
    placeholder:string;
    name:string;
    lable?:string;
}


export default function MyTextAreaInput(props:Props){
  const [field, meta, helpers] = useField(props.name);
  return (
    <FormField error={meta.touched && !!meta.error}>

      <label>{props.lable}</label>

    <ReactQuill
        value={field.value || ""}
        onChange={(content) => helpers.setValue(content)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
        theme="snow"
      />
        {
        meta.touched && meta.error?(<Label basic color="red">{meta.error}</Label>):null
        }
    </FormField>
  );
}
