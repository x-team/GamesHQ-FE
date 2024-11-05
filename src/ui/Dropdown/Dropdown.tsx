import React from 'react'
import { FieldInputProps } from 'formik'
export interface IProps<T> {
  fieldProps: FieldInputProps<T>
  label: string
  fullWidth?: boolean
  children?: React.ReactNode
}

function TextInput<T>({ fieldProps, label, children, fullWidth }: IProps<T>) {
  return (
    <span>
      <label
        htmlFor={fieldProps.name}
        className="block text-gray-700 text-sm font-bold mb-2 mr-6"
      >
        {label}
      </label>
      <select
        {...fieldProps}
        value={
          fieldProps.value as string | number | readonly string[] | undefined
        }
        className={`block shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        {children}
      </select>
    </span>
  )
}

export default TextInput
