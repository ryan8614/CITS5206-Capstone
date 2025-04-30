import AccFin from "../pages/contact_list/AccFin";

// This file is used to map the content to the corresponding floor map in excel-sync.
const content_map: Record<string, React.ReactNode> = {
    '11': <div>Ground Floor - CSI Excel Page</div>,
    '12': <div>Ground Floor - DA Excel Page</div>,
    '13': <div>Mgmt & Orgs Page</div>,
    '14': <div>Economics Page</div>,
    '15': <div>Marketing Page</div>,
    '16': <div>Accounting & Finance Page</div>,
    '17': <div>Deanery - LVL 2 Page</div>,
    '21': <AccFin />,
    '22': <div>Economics Contacts</div>,
    '23': <div>Marketing Contacts</div>,
    '24': <div>MO Contacts</div>,
    '25': <div>Dean's Office Contacts</div>,
  };

  export default content_map;