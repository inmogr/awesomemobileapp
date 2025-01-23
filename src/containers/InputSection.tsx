import React from 'react';
import SingleLineTextInput from '../components/SingleLineTextInput';
import RadioGroupInput from '../components/RadioGroupInput';
import CheckBoxGroupInput from '../components/CheckBoxGroupInput';
import {Controller, useForm} from 'react-hook-form';
import {FormPropertyType, FormSectionType} from '../types/FormTypes';
import TypeAheadTextInput from "../components/TypeAheadTextInput";

const getInitialValue = (property: FormPropertyType) => {
  switch (property.type) {
    case 'text':
      return '';
    case 'typeahead':
      return '';
    case 'select':
      return '';
    case 'multiselect':
      return [];
    default:
      return '';
  }
};

interface InputSectionProps {
  fieldNames: string[];
  properties: FormSectionType['properties'];
}

export const InputSection: React.FC<InputSectionProps> = props => {
  const form = useForm();

  React.useMemo(() => {
    // NOTE: remember those fields are unlikely to be changed even if we refetch and refetch.... therefore we don't need to register again for every render
    props.fieldNames.forEach(fieldName => {
      const property = props.properties[fieldName];
      form.register(fieldName, {
        value: getInitialValue(property),
        required: true,
        pattern: property.regex
          ? new RegExp(property.regex, property.regexFlags)
          : undefined,
      });
    });
  }, []);

  return props.fieldNames.map(fieldName => {
    const property = props.properties[fieldName];
    switch (property.type) {
      case 'text':
        return (
          <Controller
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <SingleLineTextInput
                label={property.description}
                value={field.value}
                handleChange={field.onChange}
                errorMessage={form.formState.errors[
                  fieldName
                ]?.message?.toString()}
                isDisabled={field.disabled}
              />
            )}
          />
        );
      case 'typeahead':
        return (
          <Controller
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <TypeAheadTextInput
                label={property.description}
                value={field.value}
                handleChange={field.onChange}
                errorMessage={form.formState.errors[
                  fieldName
                ]?.message?.toString()}
                isDisabled={field.disabled}
                suggestions={property.enum!}
              />
            )}
          />
        );
      case 'select':
        return (
          <Controller
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <RadioGroupInput
                label={property.description}
                value={field.value}
                handleChange={field.onChange}
                errorMessage={form.formState.errors[
                  fieldName
                ]?.message?.toString()}
                isDisabled={field.disabled}
                items={property.items!}
              />
            )}
          />
        );
      case 'multiselect':
        return (
          <Controller
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <CheckBoxGroupInput
                label={property.description}
                values={field.value}
                handleChange={field.onChange}
                errorMessage={form.formState.errors[
                  fieldName
                ]?.message?.toString()}
                isDisabled={field.disabled}
                items={property.items!}
              />
            )}
          />
        );
      default:
        return null;
    }
  });
};
