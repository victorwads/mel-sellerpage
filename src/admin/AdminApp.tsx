import './AdminApp.css';

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { configStorage } from "../main/configs/siteConfigs";
import { providers } from "../main/Menus";
import MenuItem from "../main/MenuItemInterface";

import Icon, { Icons } from '../components/Icons';

import AttendantsPage from "./pages/Attemdants/Attendants";
import ProductsPage from "./pages/Products";

export const menuItems: MenuItem[] = [
  { name: 'Atendentes', link: 'atendentes', params: '/:id?', icon: Icons.solid.faUserMd, page: <AttendantsPage /> },
  {
    name: 'Consultas & Avaliações', link: 'atendimentos', params: '/:id?', icon: Icons.solid.faClipboardList,
    page: <ProductsPage provider={providers.appointment} title="Cadastro de Consulta / Avaliações" name="Consulta" />
  },
  {
    name: 'Cursos', link: 'cursos', params: '/:id?', icon: Icons.solid.faHouse,
    page: <ProductsPage provider={providers.course} title="Cadastro de Cursos" name="Curso" />
  },
  {
    name: 'Livros e Ebooks', link: 'livros', params: '/:id?', icon: Icons.solid.faBuilding,
    page: <ProductsPage provider={providers.book} title="Cadastro de livros" name="Livro" />
  },
  {
    name: 'Yin Yang', link: 'yin-yang', params: '/:id?', icon: Icons.solid.faYinYang,
    page: <ProductsPage provider={providers.yinYang} title='Cadastro Yin Yang' name='Produto' />,
  },
  {
    name: 'Meridianos', link: 'meridianos', params: '/:id?', icon: Icons.solid.faStream,
    page: <ProductsPage provider={providers.meridians} title='Cadastro Meridianos' name='Produto' />,
  },
  {
    name: 'Avaliações', link: 'avaliacoes', params: '/:id?', icon: Icons.solid.faClipboardCheck,
    page: <ProductsPage provider={providers.evaluations} title='Cadastro Avaliações' name='Produto' />,
  },
  {
    name: 'Técnicas Terapêuticas', link: 'tecnicas-terapeuticas', params: '/:id?', icon: Icons.solid.faHands,
    page: <ProductsPage provider={providers.therapeuticTechniques} title='Cadastro Técnicas Terapêuticas' name='Produto' />,
  },
  // { name: 'Videos', link: 'videos', icon: Icons.solid.faHeadset },
  // { name: 'Indicações', link: 'indicações', icon: Icons.solid.faChalkboardTeacher },
];

const auth = getAuth();
export default function AdminApp() {
  const location = useLocation();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        configStorage.setItem('admin', 'true');
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  if (!user) {
    return (
      <div className="auth-page">
        <h1>Admin Login</h1>
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    );
  }

  return <>
    <nav>
      <ul>
        {menuItems.map(item =>
          <li key={item.link} className={location.pathname.includes(item.link) ? 'active' : ''}>
            <Link to={item.link} title={item.name}>
              <Icon icon={item.icon} />
              {item.name}
            </Link>
          </li>
        )}
      </ul>
    </nav>
    <Outlet />
  </>;
}