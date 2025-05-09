import AccFin from "@/app/features/contacts/pages/AccFin";
import Deans_Office from "@/app/features/contacts/pages/Dean's_Office";
import Economics from "@/app/features/contacts/pages/Economics";
import Marketing from "@/app/features/contacts/pages/Marketing";
import MO from "@/app/features/contacts/pages/MO";
import AccAndFin from "@/app/features/maps/pages/AccAndFin";
import GF_CSI from "@/app/features/maps/pages/GD_CSI";
import GF_DA from "@/app/features/maps/pages/GF_DA";

// This file is used to map the content to the corresponding floor map in excel-sync.
const content_map: Record<string, React.ReactNode> = {
    '11': <GF_CSI />,
    '12': <GF_DA />,
    '13': <div>Mgmt & Orgs Page</div>,
    '14': <div>Economics Page</div>,
    '15': <div>Marketing Page</div>,
    '16': <AccAndFin />,
    '17': <div>Deanery - LVL 2 Page</div>,
    '21': <AccFin />,
    '22': <Economics />,
    '23': <Marketing />,
    '24': <MO />,
    '25': <Deans_Office />,
  };

  export default content_map;