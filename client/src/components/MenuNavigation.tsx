import Menu, { MenuItem, SubMenu } from 'rc-menu';
export const MenuNavigation = () => {
  return (
    <>
      <Menu>
        <MenuItem>Account settings</MenuItem>
        <SubMenu title="2">
          <MenuItem>2</MenuItem>
          <MenuItem>1</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
};
