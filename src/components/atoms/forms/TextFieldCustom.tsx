import React from 'react';
import { Form } from 'react-bootstrap';

interface TextFieldCustomProps {
  id: string
  name: string
  type: string
  // label: string
  placeholder: string
  value:string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: boolean
  errorMessage: string | undefined
}

export default function TextFieldCustom({
  id, name, type, value, placeholder, onChange, error, errorMessage, ...props
}: TextFieldCustomProps) {
  return (
    <Form.Group className="form-group">
      <Form.Control
        autoComplete="off"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? ' is-invalid' : ''}
        {...props}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
