import { upperCaseFirst } from "./upperCaseFirst";

export const fullName = ({ firstName, lastName }: any) => {
  return upperCaseFirst(firstName) + ' ' + upperCaseFirst(lastName);
};