export const ItemLineHighlightIcon = () => {
  const highlight = (
    <svg
      width="66"
      height="17"
      viewBox="0 0 66 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.15094 0H59.9811L66 17H0L4.15094 0Z"
        fill="url(#paint0_linear_99_287)"
        fillOpacity="0.2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_99_287"
          x1="33"
          y1="0"
          x2="33"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF3D3D" />
          <stop offset="1" stopColor="#FA3434" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );

  const line = (
    <svg
      className="mr-[2px]"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="2"
      viewBox="0 0 56 2"
      fill="none"
    >
      <path
        d="M1 1H55"
        stroke="#EF3030"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      {line}
      {highlight}
    </div>
  );
};
