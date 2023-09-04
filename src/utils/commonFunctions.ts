import { debounce } from "lodash";

export const renderNA = (data: any) => {
  return data ? data : "N/A";
};

export const validateFields = debounce((form, setDisabled) => {
  form
    .validateFields()
    .then(() => {
      setDisabled(false);
    })
    .catch(() => {
      setDisabled(true);
    });
}, 500);
