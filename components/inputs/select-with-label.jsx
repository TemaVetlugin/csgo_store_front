import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const SelectWithLabel = ({
                                  label,
                                  required = false,
                                  select: { name, value, onChange, onBlur, options, error },
                                }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (inputValue) {
      const filtered = options.filter((opt) =>
          opt.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue, options]);

  useEffect(() => {
    if (!isOpen && inputValue) {
      const bestMatch = filteredOptions.find((opt) => opt.label.toLowerCase() === inputValue.toLowerCase());
      if (bestMatch) {
        onChange({ target: { name, value: bestMatch.value } });
        setInputValue(bestMatch.label);
      }
    }
  }, [isOpen]);

  return (
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="text-sm font-medium text-white flex items-center">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
              type="text"
              id={name}
              name={name}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
              className={cn(
                  "flex w-full rounded-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed bg-secondary-200 border border-secondary-300 placeholder:text-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#E24E4E] focus:ring-offset-2 disabled:bg-secondary disabled:text-[#A1A1AA] h-10 px-3 py-2 text-mini",
                  error && "border-red-500"
              )}
              placeholder="Enter country"
              maxLength={32}
          />
          {isOpen && filteredOptions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-black/70 border border-gray-700 rounded-md text-white text-sm max-h-60 overflow-auto">
                {filteredOptions.map((opt) => (
                    <li
                        key={opt.value}
                        className="px-3 py-2 hover:bg-gray-600 cursor-pointer"
                        onMouseDown={(e) => {
                          e.preventDefault(); // Предотвращает потерю фокуса
                          onChange({ target: { name, value: opt.value } });
                          setInputValue(opt.label);
                          setIsOpen(false);
                        }}
                    >
                      {opt.label}
                    </li>
                ))}
              </ul>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
  );
};
