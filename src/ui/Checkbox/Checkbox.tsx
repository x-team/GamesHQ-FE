import { FieldInputProps } from "formik";

interface IProps {
  id?: string;
  fieldProps: FieldInputProps<any>;
  hasErrors?: boolean;
  touched?: boolean;

  children?: React.ReactNode;
}

function Checkbox({id, fieldProps, children}: IProps) {
  return (
    <span className="flex items-center text-gray-700 my-2">
      <input
        type="checkbox"
        id={id}
        className="h-5 w-5 mr-2 text-blue-500"
        {...fieldProps}
        />

        <label htmlFor={fieldProps.name}>
            {children}
        </label>
    </span>
  );
}

export default Checkbox;