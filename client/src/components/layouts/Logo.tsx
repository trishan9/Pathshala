const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        alt="Logo"
        src="/logo.png"
        height={120}
        width={120}
        className="w-10"
      />

      <div className="flex flex-col gap-0">
        <h1 className="text-xl font-semibold text-main">Pathshala</h1>

        <p className="text-xs font-semibold">Your Digital School</p>
      </div>
    </div>
  );
};

export default Logo;
