import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormSectionType} from '../types/FormTypes';
import {
  localStorageGetObject,
  localStorageSetObject,
} from '../utilities/localStorage';

export const SAVE_KEY = 'ABCD_FORM';
export const STORED_FROM_LAST_SESSION = localStorageGetObject(SAVE_KEY);

interface SaveAndSubmitFormProps {}

export const SaveAndSubmitForm: React.FC = () => {
  const form = useFormContext();

  const watched = form.watch();

  React.useMemo(() => {
    localStorageSetObject(SAVE_KEY, watched);
  }, [watched]);

  return null;
};
