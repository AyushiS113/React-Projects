import moment from "moment";
import Config from "../config/Config";
import { CONSTANT } from "../config/Constant";

const dateComparator = (
  filterLocalDateAtMidnight: Date,
  cellValue: string
): number => {
  const dateAsString = moment(cellValue, Config.dateTimeFormat).format(
    CONSTANT.DATE_FORMAT
  );
  const dateParts = dateAsString.split("/");
  const cellDate = new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );

  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    return 0;
  }
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }
  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
  return 1;
};

export default dateComparator;
