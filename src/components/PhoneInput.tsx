import React from 'react';
import { CountryCodeSelect, CountryCode } from './CountryCodeSelect';

interface PhoneInputProps {
  phoneNumber: string;
  countryCode: CountryCode;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryCodeChange: (country: CountryCode) => void;
  countryCodes: CountryCode[];
}

export function PhoneInput({
  phoneNumber,
  countryCode,
  onPhoneNumberChange,
  onCountryCodeChange,
  countryCodes
}: PhoneInputProps) {
  return (
    <div className="flex rounded-md shadow-sm">
      <CountryCodeSelect
        value={countryCode}
        onChange={onCountryCodeChange}
        countryCodes={countryCodes}
      />
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        value={phoneNumber}
        onChange={onPhoneNumberChange}
        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="9876543210"
        required
        pattern="[0-9]{10}"
        title="Please enter a valid 10-digit phone number"
      />
    </div>
  );
}