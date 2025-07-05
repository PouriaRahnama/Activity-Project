import { ErrorMessage, Field, useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";


interface Props{
    placeholder:string;
    name:string;
    lable?:string;
    type?:string;
}


export default function MyTextInput(props:Props){
  const [field, meta] = useField(props.name);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.lable}</label>

      <input {...field} placeholder={props.placeholder} type={props.type}/>
        {
        meta.touched && meta.error?(<Label basic color="red">{meta.error}</Label>):null
        }
    </FormField>
  );
}

