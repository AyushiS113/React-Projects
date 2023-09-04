import React from "react";
import { ReactComponent as SyncBtn } from "../assets/images/icon/refresh.svg";
import { ReactComponent as EditBtn } from "../assets/images/icon/edit.svg";
import { ReactComponent as DeleteBtn } from "../assets/images/icon/delete.svg";
import { ReactComponent as Map } from "../assets/images/icon/map.svg";
import { ReactComponent as MapSolid } from "../assets/images/icon/map-solid.svg";
import { ReactComponent as Close } from "../assets/images/icon/close.svg";
import { ReactComponent as View } from "../assets/images/icon/view.svg";
import { ReactComponent as Filter } from "../assets/images/icon/filter.svg";
import { ReactComponent as DocExcel } from "../assets/images/icon/doc_exel.svg";
import { ReactComponent as PrintReport } from "../assets/images/icon/print.svg";
import { ReactComponent as PDF } from "../assets/images/icon/pdf.svg";
import { ReactComponent as RightArrrow } from "../assets/images/icon/right_arrow.svg";
import { ReactComponent as DocCSV } from "../assets/images/icon/CSV_file.svg";
import { ReactComponent as History } from "../assets/images/icon/history.svg";
import { ReactComponent as RightTick } from "../assets/images/icon/rightTick.svg";
import { ReactComponent as ChangePass } from "../assets/images/icon/change_password.svg";
import { ReactComponent as Watch } from "../assets/images/icon/watch.svg";
// import { ReactComponent as AttenCamera } from "../assets/images/icon/attendance_icon/camera_icon.svg";
// import { ReactComponent as AttenNotes } from "../assets/images/icon/attendance_icon/notes.svg";
// import { ReactComponent as AttenOffice } from "../assets/images/icon/attendance_icon/office.svg";
// import { ReactComponent as AttenUser } from "../assets/images/icon/attendance_icon/user.svg";
// import { ReactComponent as AttenWatch } from "../assets/images/icon/attendance_icon/watch.svg";
// import { ReactComponent as AttenZone } from "../assets/images/icon/attendance_icon/zone.svg";
// import { ReactComponent as DashboardPendingAmount } from "../assets/images/icon/dashboard/pending_amount.svg";
// import { ReactComponent as DashboardReceivedAmount } from "../assets/images/icon/dashboard/Received_Amount.svg";
// import { ReactComponent as DashboardTaxAmount } from "../assets/images/icon/dashboard/Tax_Amount.svg";
// import { ReactComponent as DashboardTotalReport } from "../assets/images/icon/dashboard/Total_Reports.svg";
// import { ReactComponent as DashboardDogCaptured } from "../assets/images/icon/dashboard/dog_captured.svg";
// import { ReactComponent as DashboardActionNotTaken } from "../assets/images/icon/dashboard/action_not_taken.svg";
// import { ReactComponent as DashboardDogRealesed } from "../assets/images/icon/dashboard/dog_Released.svg";
// import { ReactComponent as DashboardDogSterlized } from "../assets/images/icon/dashboard/dog_sterilized.svg";
// import { ReactComponent as DashboardDogEscaped } from "../assets/images/icon/dashboard/escaped_during_recieved.svg";
// import { ReactComponent as DashboardDogFitRelease } from "../assets/images/icon/dashboard/fit_Release.svg";
// import { ReactComponent as DashboardDogReceived } from "../assets/images/icon/dashboard/received.svg";
import { ReactComponent as FacebookSolid } from "../assets/images/icon/facebook.svg";
import { ReactComponent as TwitterSolid } from "../assets/images/icon/twitter.svg";
// import { ReactComponent as DashboardPilotUnassigned } from "../assets/images/icon/dashboard/total_unassigned.svg";
// import { ReactComponent as DashboardPilotResolved } from "../assets/images/icon/dashboard/total_resolved.svg";
// import { ReactComponent as DashboardPilotPendingCompl } from "../assets/images/icon/dashboard/total_pending_complaints.svg";
// import { ReactComponent as DashboardPilotLongTerm } from "../assets/images/icon/dashboard/total_long_term.svg";
// import { ReactComponent as DashboardPilotComplaints } from "../assets/images/icon/dashboard/total_complaints.svg";
// import { ReactComponent as DashboardPilotSubmitApproval } from "../assets/images/icon/dashboard/submit_for_approval.svg";

interface IconProps {
  icon: string; //make the clear type to make switch
  color?: string;
  width?: number;
}

const SVGIcon = ({ icon, color = "#696b71", width = 14 }: IconProps) => {
  // In this case you have to think about the switch and types in typescript.
  const Icons: any = {
    refresh: <SyncBtn fill={color} width={width} height={width} />,
    close: <Close fill={color} width={width} height={width} />,
    edit: <EditBtn fill={color} width={width} height={width} />,
    delete: <DeleteBtn fill={color} width={width} height={width} />,
    view: <View fill={color} width={width} height={width} />,
    map: <Map fill={color} width={width} height={width} />,
    mapSolid: <MapSolid fill={color} width={width} height={width} />,
    filter: <Filter fill={color} width={width} height={width} />,
    DocExcel: <DocExcel fill={color} width={width} height={width} />,
    DocCSV: <DocCSV fill={color} width={width} height={width} />,
    PrintReport: <PrintReport fill={color} width={width} height={width} />,
    PDF: <PDF fill={color} width={width} height={width} />,
    right_arrow: <RightArrrow fill={color} width={width} height={width} />,
    history: <History fill={color} width={width} height={width} />,
    rightTick: <RightTick fill={color} width={width} height={width} />,
    changePass: <ChangePass fill={color} width={width} height={width} />,
    watch: <Watch fill={color} width={width} height={width} />,
   
    FacebookSolid: <FacebookSolid fill={color} width={width} height={width} />,
    TwitterSolid: <TwitterSolid fill={color} width={width} height={width} />,
   
  };
  return Icons[icon];
};

export default SVGIcon;
