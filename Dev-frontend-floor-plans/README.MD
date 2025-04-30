# 2nd-floor-map
This folder contains an early prototype of the 2nd floor plan interface using static HTML and Bootstrap 5, including 3 departments: Marketing, Deanary, Accountant&Finance.

## Current Status:
1. Three departments floor plans laid out using Bootstrap grid.
2. Use color-coding to identify different types of staff.
3. Use id and different classes to identify the room and content, which is easier for later retrival.
4. Code with comments to explain the purpose and structure. Code block marked with location for easily searching.

### Color-coding
1. Green(#DDE5B6):PhD, master of phil, RA
2. Yellow(#FFFF00): vacant
3. Orange(#FFC107):visiting students/staff
4. Blue(#aee4f5): casual/part-time staff
5. No color: other regular staff

### Attributes
1. Each room has its id strat with "R" and followed by the room number, no space between them
2. All rooms have a same class "room-box"
3. Rooms with specified colors have color classes, for example "green-box" "yellow-box" etc.
4. Each room have several classes to identify its content, for example, class "room" used to identify room number, class "name" used to identify staff name (Vacant if no occupied), class "ext" used to identify the extension number, "key-locker" used to identify key locker,"ptr" used to identify printer number, "printer-serial" used to identify printer serial number. Some public spaces do not have all these classes.
5. If a room does not have a room number, then no id is assigned to it and its room name will be displayed under the "room" class.

## Next Steps:
1. Keep consistent style with other team members' work.
2. Integrate with React and Next.js, and merge to Develop branch.