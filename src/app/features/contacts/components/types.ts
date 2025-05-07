export type StaffEntry = {
    Classification: string;
    'Full Name': string;
    Position: string;
    'Ext No': string | number;
    Room: string | number;
    source?: 'Academic' | 'Research';
  };
  
export type ContactData = {
  'Academic Staff': Omit<StaffEntry, 'source'>[];
  'Research Fellows/Adjunct Professor': Omit<StaffEntry, 'source'>[];
};