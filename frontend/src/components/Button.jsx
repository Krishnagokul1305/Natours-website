import { Link } from "react-router-dom";

function Button({ variant, onClick, children, type, to }) {
  const baseStyle =
    " rounded-lg transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-2 font-bold flex flex-row items-center gap-2 hover:translate-y-[-4px] hover:shadow-lg";

  const primaryBtn =
    " bg-white focus:ring-white  focus:ring-offset-white text-gray-800 ";

  const primaryUnfill = " bg-transparent border-[3px] border-white text-white ";

  const secondaryBtn =
    " bg-primary text-white focus:ring-[#61dad5]  focus:ring-offset-2 rounded-full";

  const secondaryUnfill =
    " bg-transparent border-[3px] border-[#1e798bc7]  text-ptext ";

  let btnStyle = baseStyle;

  const small = " px-3 py-2 text-sm";
  const big = " px-5 py-3 text-base";
  if (variant === "primary") btnStyle += primaryBtn;
  if (variant === "secondary") btnStyle += secondaryBtn;
  if (variant === "primaryUnfill") btnStyle += primaryUnfill;
  if (variant === "secondaryUnfill") btnStyle += secondaryUnfill;
  if (type === "small") btnStyle += small;
  if (type === "big") btnStyle += big;

  if (to)
    return (
      <Link to={to} className={btnStyle}>
        {children}
      </Link>
    );

  return (
    <button className={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
