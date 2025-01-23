import React from 'react';
import {FormPropertyType} from '../types/FormTypes';
import {Controller, useFormContext} from 'react-hook-form';
import SingleLineTextInput from '../components/SingleLineTextInput';
import {FormSection} from './FormSection';
import {combineParentChildName} from '../utilities/combineParentChildName';
import Collapsible from 'react-native-collapsible';
import TypeAheadTextInput from '../components/TypeAheadTextInput';
import CheckBoxGroupInput from '../components/CheckBoxGroupInput';
import RadioGroupInput from '../components/RadioGroupInput';
import {
  localStorage,
  localStorageGetObject,
  localStorageSetObject,
} from '../utilities/localStorage';

interface FormSectionInputProps {
  parentId: string;
  propertyName: string;
  property: FormPropertyType;
}

export const FormSectionInput: React.FC<FormSectionInputProps> = ({
  parentId,
  propertyName,
  property,
}) => {
  const form = useFormContext();
  const fieldName = combineParentChildName(parentId, propertyName);
  const watchedValue = form.watch(fieldName);

  //
  //
  //

  const isMultiSelect = property.type === 'multiselect';
  const comparedValues: string[] = isMultiSelect
    ? watchedValue
    : [watchedValue];

  React.useMemo(() => {
    form.register(fieldName, {
      value: isMultiSelect ? [] : '',
      required: true,
      pattern: property.regex
        ? new RegExp(property.regex, property.regexFlags)
        : undefined,
    });

    const value = isMultiSelect
      ? localStorageGetObject(fieldName) || []
      : localStorage.getString(fieldName) || '';
    form.setValue(fieldName, value);
  }, []);

  //
  //
  //

  const [isVisible, setVisibility] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof watchedValue === 'string') {
      localStorage.set(fieldName, watchedValue);
    } else if (typeof watchedValue === 'object') {
      localStorageSetObject(fieldName, watchedValue);
    }

    if (!property.subitems || !property.subitems_visible_on) {
      return;
    }

    const conditionsSet = new Set(property.subitems_visible_on);
    const hasMatch = comparedValues.some(value => conditionsSet.has(value));
    setTimeout(() => {
      setVisibility(hasMatch);
    }, 100);
  }, [comparedValues]);

  //
  //
  //

  const properties = isVisible ? property.subitems || {} : {};
  const propertyNames = Object.keys(properties);

  //
  //
  //

  switch (property.type) {
    case 'text':
      return (
        <Controller
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

              <Collapsible collapsed={!isVisible}>
                <FormSection
                  parentId={fieldName}
                  properties={properties}
                  propertyNames={propertyNames}
                />
              </Collapsible>
            </React.Fragment>
          )}
        />
      );
    case 'typeahead':
      return (
        <Controller
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

              <Collapsible collapsed={!isVisible}>
                <FormSection
                  parentId={fieldName}
                  properties={properties}
                  propertyNames={propertyNames}
                />
              </Collapsible>
            </React.Fragment>
          )}
        />
      );
    case 'select':
      return (
        <Controller
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

              <Collapsible collapsed={!isVisible}>
                <FormSection
                  parentId={fieldName}
                  properties={properties}
                  propertyNames={propertyNames}
                />
              </Collapsible>
            </React.Fragment>
          )}
        />
      );
    case 'multiselect':
      return (
        <Controller
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

              <Collapsible collapsed={!isVisible}>
                <FormSection
                  parentId={fieldName}
                  properties={properties}
                  propertyNames={propertyNames}
                />
              </Collapsible>
            </React.Fragment>
          )}
        />
      );
    default:
      return null;
  }
};
