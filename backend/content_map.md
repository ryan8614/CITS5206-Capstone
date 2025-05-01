### **🧭 Dynamic Content Mapping: content_map.ts**

##### **📌 Purpose**

The content_map component serves as a centralized mapping object that links specific menu keys (e.g. '11', '21') to corresponding content components or JSX blocks. This design allows dynamic rendering of content based on user menu selection, without needing multiple route-based pages.



------

##### **📁 File Location**

```bash
src/app/components/ContentMap.ts
```



------

##### **🛠 Structure Overview**

```react
const content_map: Record<string, React.ReactNode> = {
  '11': <div>Ground Floor - CSI Excel Page</div>,
  ...
  '21': <AccFin />,
};
```



- Keys like '11', '12', '21' correspond to Menu.Item keys in the sidebar menu.
- Values are either simple JSX blocks or full React components (e.g. <AccFin />).
- Components can be imported and mapped directly (e.g. import AccFin from '../pages/contact_list/AccFin').



------

##### **📄 Page Component Example**

```react
import content_map from '@/app/components/ContentMap';

const [selectedKey, setSelectedKey] = useState('11');

// Render corresponding component in Content area
<Content>
  {content_map[selectedKey] || <div>No content found</div>}
</Content>
```



- The selectedKey updates based on the sidebar Menu click.
- The corresponding component or JSX is fetched from content_map.



------

##### **📦 Sidebar Integration**

The Ant Design \<Menu> is configured with nested items:

```
items={[
  {
    key: '1',
    label: 'Accommodation List',
    children: [
      { key: '11', label: 'Ground Floor - CSI' },
      { key: '12', label: 'Ground Floor - DA' },
      ...
    ]
  },
  {
    key: '2',
    label: 'Contact List',
    children: [
      { key: '21', label: 'AccFin' },
      ...
    ]
  }
]}
```

When a menu item is clicked, setSelectedKey(key) updates the view dynamically.



------

##### **📋 Example: Adding New Content**

To add a new floor or contact section:

1. Create the component in the relevant folder (e.g. pages/contact_list/HR.tsx)
2. Import the component:

```react
import HR from '../pages/contact_list/HR';
```

3. Add a new entry to content_map:

```react
'26': <HR />,
```

4. Add a corresponding menu item:

```
{
  key: '26',
  label: 'Human Resources',
  icon: <FileTextOutlined />
}
```



------

##### **💡 Benefits of this Design**

- **Modular**: Pages are decoupled and easy to update independently.
- **Dynamic Rendering**: All content is rendered within a single layout via mapping.
- **Scalable**: Easy to extend by adding components to the map.



------

##### **🔐 Developer Notes**

- This structure assumes that the keys used in the Menu match the keys in content_map.
- Default fallback (No content found) is shown for invalid keys.
- Use TypeScript’s Record<string, React.ReactNode> for strong typing.

