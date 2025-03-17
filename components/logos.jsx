import { Carousel } from "./carousel";
import { Icon } from "./icon";

const icons = ["LogitechIcon", "InstagramIcon", "GoogleIcon", "FigmaIcon"];
export const Logos = () => {
  return (
    <>
      <Carousel
        className="border-t border-secondary-300 py-6 md:!hidden"
        chunks={2}
        slides={icons.map((icon) => (
          <Icon key={icon} name={icon} />
        ))}
      />
      <ul className="mt-2 hidden w-2/3 gap-20 border-t border-secondary-300 py-6 md:flex">
        {icons.map((icon) => (
          <li key={icon}>
            <Icon name={icon} />
          </li>
        ))}
      </ul>
    </>
  );
};
