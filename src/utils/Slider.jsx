/* eslint-disable react/prop-types */

export const Slider = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="range"
        className={`
          w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
          dark:bg-gray-700
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:bg-blue-500
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:cursor-pointer
          ${className}
        `}
        {...props}
      />
    </div>
  );
};
