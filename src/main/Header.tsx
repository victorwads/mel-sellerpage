import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Header.css';

import { useConfigs } from "./ConfigProvider";
import MenuItem from "./MenuItemInterface";

import Icon, { Icons } from '../components/Icons';
import { menuItems } from "./Menus";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const configs = useConfigs();
  const closeMenu = () => setMenuVisible(false);

  return <>
    <header>
      <div className="content">
        <Icon
          icon={Icons.solid.faBars} color={configs.headerAssentColor} size="xl"
          onClick={() => setMenuVisible(!menuVisible)} />
        <img src={configs.logo} alt="logo" height="90" />
        <Icon icon={Icons.solid.faSearch} color={configs.headerAssentColor} size="xl" />
      </div>
    </header>
    <div className={[menuVisible ? 'visible' : 'hidden', 'sidebar'].join(' ')}>
      <div className="closeArea" onClick={closeMenu} />
      <nav>
        {menuItems.map(item => <MenuItemComponent key={item.link} item={item} close={closeMenu} />)}
      </nav>
    </div>
  </>;
}

interface MenuItemProps {
  item: MenuItem;
  close: () => void;
}

const MenuItemComponent = ({ item, close }: MenuItemProps) => {
  const configs = useConfigs();
  const [show, setShow] = useState(!item.provider || item.provider.hasItems());

  useEffect(() => {
    if(show || !item.provider) return;

    item.provider.countAll().then(() =>
      setShow(item.provider!.hasItems())
    );
  }, [item.provider, show]);

  return show && <Link to={item.link} title={item.name} key={item.link} onClick={close}>
    <Icon icon={item.icon} color={configs.menuAssentColor || configs.headerAssentColor} />
    {item.name}
  </Link>
}
