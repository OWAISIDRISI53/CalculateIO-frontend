function HeaderBar() {
  return (
    <div className="grid grid-cols-4 gap-4 items-center px-4 py-2 w-full">
      {/* Logo */}
      <div className="text-white font-bold text-xl">LOGO</div>

      {/* Pen / Erase buttons */}
      <div className="flex items-center justify-center space-x-2">
        <button className="text-white flex items-center space-x-2">
          <span>Pen</span>
        </button>
        <button className="text-white items-center space-x-2">
          <span>Erase</span>
        </button>
      </div>

      {/* Color palette */}
      <div className="flex items-center justify-center space-x-2">
        <button
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: "red" }}
        />
        <button
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: "blue" }}
        />
        <button
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: "green" }}
        />
      </div>

      {/* Brush size */}
      <div className="flex items-center justify-center space-x-2">
        <button className="px-2 py-1 text-white bg-blue-500">S</button>
        <button className="px-2 py-1 text-white bg-gray-500">M</button>
        <button className="px-2 py-1 text-white bg-gray-500">L</button>
      </div>
    </div>
  );
}

export default HeaderBar;
