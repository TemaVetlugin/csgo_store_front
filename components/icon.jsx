import { ICONS } from "./icons/_index";

export const Icon = ({
  name = "",
  className = "",
  iconClassName = "",
  style = {},
}) => {
  const Icon = ICONS[name];

  return (
    <div className={className} style={style}>
      <Icon className={iconClassName} />
    </div>
  );
};
