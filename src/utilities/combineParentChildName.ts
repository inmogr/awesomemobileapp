export const PARENT_CHILD_SEPARATOR = '___';

export const combineParentChildName = (parent: string, child: string) =>
  `${parent}${PARENT_CHILD_SEPARATOR}${child}`;
