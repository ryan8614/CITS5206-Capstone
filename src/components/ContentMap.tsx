import AccFin from "@/app/features/contacts/pages/AccFin";
import Deans_Office from "@/app/features/contacts/pages/Dean's_Office";
import Economics from "@/app/features/contacts/pages/Economics";
import Marketing from "@/app/features/contacts/pages/Marketing";
import MO from "@/app/features/contacts/pages/MO";
import AccAndFin from "@/app/features/maps/pages/AccAndFin";
import GF_CSI from "@/app/features/maps/pages/GF_CSI";
import GF_DA from "@/app/features/maps/pages/GF_DA";
import Deanary from "@/app/features/maps/pages/Deanary";
import MgmtAndOrgs from "@/app/features/maps/pages/MgmtAndOrgs";
import Economics_Map from "@/app/features/maps/pages/Economics";
import Marketing_Map from "@/app/features/maps/pages/Marketing";
import GF_DA_S from "@/app/features/students/pages/GF_DA_S";
import MO_S from "@/app/features/students/pages/MO_S" ;
import AccFin_S from "@/app/features/students/pages/AccFin_S";
import Economics_S from "@/app/features/students/pages/Economics_S";
import Marketing_S from "@/app/features/students/pages/Marketing_S";

// This file is used to map the content to the corresponding floor map in excel-sync.
const content_map: Record<string, React.ReactNode> = {
    '11': <GF_CSI />,
    '12': <GF_DA />,
    '13': <MgmtAndOrgs />,
    '14': <Economics_Map />,
    '15': <Marketing_Map />,
    '16': <AccAndFin />,
    '17': <Deanary/>,
    '21': <AccFin />,
    '22': <Economics />,
    '23': <Marketing />,
    '24': <MO />,
    '25': <Deans_Office />,
    '31': <MO_S />,
    '32': <Economics_S />,
    '33': <Marketing_S />,
    '34': <AccFin_S />,
    '35': <GF_DA_S />,
  };

export default content_map;