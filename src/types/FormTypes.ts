export interface FormPropertyType {
  type: string;
  description: string;

  regex?: string;
  regexFlags?: string;

  items?: string[];
  enum?: string[];

  subitems_visible_on?: string[];
  subitems?: Record<string, FormPropertyType>;
}

export interface FormSectionType {
  type: string;
  properties: Record<string, FormPropertyType>;
}

export type FormType = Record<string, FormSectionType>;
