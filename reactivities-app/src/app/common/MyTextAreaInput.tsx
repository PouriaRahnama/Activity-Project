import { ErrorMessage, Field, useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";


interface Props{
    placeholder:string;
    name:string;
    lable?:string;
}


export default function MyTextAreaInput(props:Props){
  const [field, meta] = useField(props.name);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.lable}</label>

      <textarea {...field} placeholder={props.placeholder}/>
        {
        meta.touched && meta.error?(<Label basic color="red">{meta.error}</Label>):null
        }
    </FormField>
  );
}
