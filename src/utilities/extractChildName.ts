import {PARENT_CHILD_SEPARATOR} from './combineParentChildName';

export const extractChildName = (fieldName: string) =>
  fieldName.split(PARENT_CHILD_SEPARATOR).pop();
