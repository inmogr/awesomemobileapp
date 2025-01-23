import React from 'react';
import {FormPropertyType} from '../types/FormTypes';
import {FormSectionInput} from './FormSectionInput';

interface FormSectionProps {
  parentId: string;
  propertyNames: string[];
  properties: Record<string, FormPropertyType>;
}

export const FormSection: React.FC<FormSectionProps> = ({
  parentId,
  propertyNames,
  properties,
}) =>
  propertyNames.map(propertyName => {
    return (
      <FormSectionInput
        key={propertyName}
        parentId={parentId}
        propertyName={propertyName}
        property={properties[propertyName]}
      />
    );
  });
