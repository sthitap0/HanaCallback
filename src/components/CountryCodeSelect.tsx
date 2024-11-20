import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

interface CountryCodeSelectProps {
  value: CountryCode;
  onChange: (country: CountryCode) => void;
  countryCodes: CountryCode[];
}

export function CountryCodeSelect({ value, onChange, countryCodes }: CountryCodeSelectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="inline-flex items-center px-4 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span className="mr-2">{value.flag}</span>
        {value.code}
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
          <ul className="py-1 max-h-56 overflow-auto">
            {countryCodes.map((country) => (
              <li
                key={country.code}
                onClick={() => {
                  onChange(country);
                  setIsDropdownOpen(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <span className="mr-2">{country.flag}</span>
                <span>{country.code}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}