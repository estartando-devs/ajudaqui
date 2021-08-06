import React from "react";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { masks } from "../../utils/masks";
import * as S from "./InputStyles";

export const Input = ({
  label, mask, ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const { target } = e;
    const maskedValue = masks[mask || "standard"](target?.value || "");
    setFieldValue(props.name, maskedValue);
  };
  return (
    <S.InputWrapper>
      <S.Label htmlFor={props.id || props.name}>{label}</S.Label>
      <S.Input
        {...field}
        {...props}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {meta.touched && meta.error ? (
        <S.MessageError>
          {meta.error}

        </S.MessageError>
      ) : null}
    </S.InputWrapper>

  );
};

Input.protoType = {
  mask: PropTypes.string,
  label: PropTypes.string,
};
