import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

interface Props {
  name: string;
  label?: string;
  accept?: string;
  onChange?: (file: File) => void;
}

export default function MyFileInput({ name, label, accept, onChange }: Props) {
  const [field, meta, helpers] = useField(name);

  return (
    <FormField error={meta.touched && !!meta.error}>
      {label && <label>{label}</label>}

      <input
        type="file"
        accept={accept || "image/*"}
        onChange={(e) => {
          if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            helpers.setValue(file); 
            if (onChange) {
              onChange(file); 
            }
          }
        }}
      />

      {meta.touched && meta.error && (
        <Label basic color="red">{meta.error}</Label>
      )}
    </FormField>
  );
}
