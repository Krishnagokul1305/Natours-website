function Button({ variant, onClick, children, type }) {
  const baseStyle =
    " rounded-lg transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-2 font-bold flex flex-row items-center gap-2 hover:translate-y-[-4px] hover:shadow-lg ";

  const primaryBtn =
    " bg-white focus:ring-white  focus:ring-offset-white text-gray-800";

  const primaryUnfill = " bg-transparent border-[3px] border-white text-white ";

  const secondaryBtn =
    " bg-primary text-white focus:ring-[#61dad5]  focus:ring-offset-2 rounded-full";

  let btnStyle = baseStyle;

  const small = " px-5 py-3 text-sm";
  const big = " px-5 py-3 text-base";
  if (variant === "primary") btnStyle += primaryBtn;
  if (variant === "secondary") btnStyle += secondaryBtn;
  if (variant === "primaryUnfill") btnStyle += primaryUnfill;
  if (type === "small") btnStyle += small;
  if (type === "big") btnStyle += big;
  return (
    <button className={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
