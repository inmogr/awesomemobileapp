import React from 'react';
import SingleLineTextInput from '../components/SingleLineTextInput';
import RadioGroupInput from '../components/RadioGroupInput';
import CheckBoxGroupInput from '../components/CheckBoxGroupInput';
import {Controller, useForm} from 'react-hook-form';
import {FormPropertyType, FormSectionType} from '../types/FormTypes';
import TypeAheadTextInput from '../components/TypeAheadTextInput';
import Collapsible from 'react-native-collapsible';

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
    // NOTE: remember those fields are unlikely to be changed even if we refetch and refetch...
    // maybe monthly or annually would change but not necessarily....
    // therefore we don't need to register again for every render
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
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <React.Fragment>
                <SingleLineTextInput
                  label={property.description}
                  value={field.value}
                  handleChange={field.onChange}
                  errorMessage={form.formState.errors[
                    fieldName
                  ]?.message?.toString()}
                  isDisabled={field.disabled}
                />

                <InputSubItems
                  fieldName={fieldName}
                  property={property}
                  values={field.value ? [field.value] : []}
                />
              </React.Fragment>
            )}
          />
        );
      case 'typeahead':
        return (
          <Controller
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <React.Fragment>
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

                <InputSubItems
                  fieldName={fieldName}
                  property={property}
                  values={field.value ? [field.value] : []}
                />
              </React.Fragment>
            )}
          />
        );
      case 'select':
        return (
          <Controller
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <React.Fragment>
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

                <InputSubItems
                  fieldName={fieldName}
                  property={property}
                  values={field.value ? [field.value] : []}
                />
              </React.Fragment>
            )}
          />
        );
      case 'multiselect':
        return (
          <Controller
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <React.Fragment>
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

                <InputSubItems
                  fieldName={fieldName}
                  property={property}
                  values={field.value ? [...field.value] : []}
                />
              </React.Fragment>
            )}
          />
        );
      default:
        return null;
    }
  });
};

interface InputSubItemsProps {
  fieldName: string;
  property: FormPropertyType;
  values: string[];
}

export const InputSubItems: React.FC<InputSubItemsProps> = props => {
  const [isVisible, setVisibility] = React.useState<boolean>(false);

  React.useEffect(() => {
    // The only thing subject to change here is values therefore others are not really important
    if (!props.property.subitems || !props.property.subitems_visible_on) {
      return;
    }

    const conditionsSet = new Set(props.property.subitems_visible_on);
    const hasMatch = props.values.some(value => conditionsSet.has(value));
    setTimeout(() => {
      setVisibility(hasMatch);
    }, 100);
  }, [props.values]);

  return (
    <Collapsible collapsed={!isVisible}>
      <InputSection
        fieldNames={Object.keys(props.property.subitems || {})}
        properties={props.property.subitems || {}}
      />
    </Collapsible>
  );
};
