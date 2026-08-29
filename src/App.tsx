import { useEffect, useState } from 'react';
import './App.css';

import AppRoutes from './main/AppRoutes';
import { useConfigs } from './main/ConfigProvider';
import Footer from './main/Footer';
import Header, { menuItems as appMenus } from './main/Header';

import Icon, { Icons } from './components/Icons';
import MainContent from './components/MainContent';

import AdminApp, { menuItems as adminMenus } from './admin/AdminApp';
import { registerWindowMoveEvent } from './pages/Products';
import { trackContact } from './main/tracking/metaPixel';

function App() {
  const [floatingBottomMargin, setFloatingBottomMargin] = useState(0);
  const configs = useConfigs();

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      setFloatingBottomMargin(window.innerHeight - footer.getBoundingClientRect().top + 20);
    }
    return registerWindowMoveEvent(handleScroll);
  }, []);

  return <AppRoutes routes={[
    {
      base: '/', routes: appMenus, rootElement: !configs ? <>Loading</> : <>
        <Header />
        <MainContent />
        <Footer />
        {configs.whatsappLink && <a href={configs.whatsappLink} target='_blank' rel='noreferrer' className='whatszapp floating' onClick={() => trackContact('whatsapp')}>
          <Icon icon={Icons.brands.faWhatsapp} size='3x' />
        </a>}
        {floatingBottomMargin > 20 && <style>{`
.floating {
    bottom: ${floatingBottomMargin}px !important;
}
      `}</style>}
      </>
    },
    { base: '/admin', routes: adminMenus, rootElement: <AdminApp /> },
  ]} />
}

export default App;


