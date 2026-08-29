import Icon, { getIconByCaseInsensitiveName } from "../components/Icons";
import { useConfigs } from "./ConfigProvider";
import { trackSocialClick } from "./tracking/metaPixel";

export default function Footer() {
  const configs = useConfigs();

  return <footer style={{
    backgroundColor: configs.headerAssentColor,
    color: configs.fotterFontColor,
  }}>
    <div className="content">
      <img src={configs.fotterLogo || configs.logo} alt="logo" height="90" />
      <div className="socials">
        {configs.socials.map(social => <a href={social.link} key={social.name} title={social.name} target="_blank" rel="noreferrer" onClick={() => trackSocialClick(social.name, social.link)}>
          <Icon icon={getIconByCaseInsensitiveName(social.icon)} color={configs.fotterFontColor} />
        </a> )}
      </div>
      <span className="madeBy">
        Created by <a href="https://linkedin.com/in/victorwads" rel="noreferrer" target="_blank">Victor Wads</a>
      </span>
    </div>
  </footer>;
}
