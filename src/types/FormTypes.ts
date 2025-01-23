export interface FormPropertyType {
  type: string;
  description: string;

  regex?: string;
  regexFlags?: string;

  items?: string[];
  enums?: string[];
}

export interface FormSectionType {
  type: string;
  properties: Record<string, FormPropertyType>;
}

export type FormType = Record<string, FormSectionType>;
