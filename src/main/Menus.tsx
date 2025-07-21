import { isAdmin } from "./configs/siteConfigs";
import ProductsProvider, { ProductType } from "./data/products";
import MenuItem from "./MenuItemInterface";

import Home from "../pages/Home";
import WhoWeAre from "../pages/WhoWeAre";
import ProductsPage from "../pages/Products";
import { Icons } from '../components/Icons';

export const booksPageLink = 'livros';

export const providers = {
  appointment: new ProductsProvider('appointment'),
  course: new ProductsProvider('course'),
  book: new ProductsProvider('book'),
  yinYang: new ProductsProvider('yin-yang'),
  meridians: new ProductsProvider('meridians'),
  evaluations: new ProductsProvider('evaluations'),
  therapeuticTechniques: new ProductsProvider('therapeutic-techniques'),
};

export const menuItems: MenuItem[] = [
  { name: 'Home', link: '', icon: Icons.solid.faHouse, page: <Home /> },
  { name: 'Quem Somos', link: 'sobre', icon: Icons.solid.faBuilding, page: <WhoWeAre /> },
  {
    name: 'Yin Yang', link: 'yin-yang', params: '/:id?', icon: Icons.solid.faYinYang,
    provider: providers.yinYang,
    page: <ProductsPage provider={providers.yinYang} title='Yin Yang' filter={{ category: 'Yin Yang' }} />,
  },
  {
    name: 'Meridianos', link: 'meridianos', params: '/:id?', icon: Icons.solid.faStream,
    provider: providers.meridians,
    page: <ProductsPage provider={providers.meridians} title='Meridianos' filter={{ category: 'Meridianos' }} />,
  },
  {
    name: 'Avaliações', link: 'avaliacoes', params: '/:id?', icon: Icons.solid.faClipboardCheck,
    provider: providers.evaluations,
    page: <ProductsPage provider={providers.evaluations} title='Avaliações' filter={{ category: 'Avaliações' }} />,
  },
  {
    name: 'Técnicas Terapêuticas', link: 'tecnicas-terapeuticas', params: '/:id?', icon: Icons.solid.faHands,
    provider: providers.therapeuticTechniques,
    page: <ProductsPage provider={providers.therapeuticTechniques} title='Técnicas Terapêuticas' filter={{ category: 'Técnicas Terapêuticas' }} />,
  },
  // { name: 'Fale com a gente', link: 'fale-conosco', icon: Icons.solid.faHeadset },
  {
    name: 'Cursos', link: 'cursos', params: '/:id?', icon: Icons.solid.faChalkboardTeacher,
    provider: providers.course,
    page: <ProductsPage provider={providers.course} title="Cursos" />
  },
  {
    name: 'Consultas & Avaliações', params: '/:id?', link: 'atendimentos', icon: Icons.solid.faClipboardList,
    provider: providers.appointment,
    page: <ProductsPage provider={providers.appointment} title="Consultas & Avaliações" />
  },
  {
    name: 'Livros & E-Books', params: '/:id?', link: booksPageLink, icon: Icons.solid.faBook,
    provider: providers.book,
    page: <ProductsPage provider={providers.book} title="Livros & E-Books" />
  },
  // { name: 'Videos', link: 'videos', params: '/:id?', icon: Icons.solid.faVideo },
  // { name: 'Indicações', link: 'indicacoes', icon: Icons.solid.faStar },
];

if (isAdmin) {
  menuItems.push({
    name: 'Administração', link: 'admin', icon: Icons.solid.faTools, page: null
  });
}

const pageByType: {[K in ProductType]?: string;} = {}
export function getPageByType(type?: ProductType): string {
  if (!type) return 'unknown';
  return pageByType[type] || 'unknown';
}

menuItems.forEach(item => {
  const type = item?.provider?.getType();
  if (!type) return;

  pageByType[type] = item.link;
});
