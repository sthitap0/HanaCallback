import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, CheckCircle, ArrowLeft, ChevronDown } from 'lucide-react';

const preCallContent = {
  depression: {
    title: 'Depression Screening (PHQ-9)',
    experience: [
      'Complete PHQ-9 questionnaire',
      'Discuss symptom changes',
      'Track treatment progress',
      'Identify areas of concern'
    ]
  },
  medication: {
    title: 'Medication Adherence Monitoring',
    experience: [
      'Medication adherence check',
      'Side effect monitoring',
      'Barrier identification',
      'Resource coordination'
    ]
  },
  treatment: {
    title: 'Treatment Response Assessment',
    experience: [
      'Progress evaluation',
      'Quality of life assessment',
      'Treatment effectiveness review',
      'Care plan adjustment discussion'
    ]
  }
};

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
];

function PreCallPage() {
  const { type } = useParams<{ type: keyof typeof preCallContent }>();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(countryCodes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const content = type ? preCallContent[type] : null;

  if (!content) {
    return <div>Invalid assessment type</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle phone call logic here
    console.log('Initiating call to:', countryCode.code + phoneNumber);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(`/intro/${type}`)}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to introduction
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h1>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <p className="text-gray-600 mb-6">
          Hana will act as your AI healthcare agent, conducting a thorough assessment using validated clinical tools.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">What you'll experience:</h2>
        <ul className="space-y-3 mb-8">
          {content.experience.map((item, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              {item}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Call Type
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Phone</span>
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center px-4 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="mr-2">{countryCode.flag}</span>
                  {countryCode.code}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                    <ul className="py-1 max-h-56 overflow-auto">
                      {countryCodes.map((country) => (
                        <li
                          key={country.code}
                          onClick={() => {
                            setCountryCode(country);
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
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="(555) 555-5555"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              We need your phone number so the AI can call you for the demo. Don't worry, we won't save your information.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call me!
          </button>
        </form>
      </div>

      <p className="text-sm text-gray-500 text-center">
        This is a demo call. No personal health information will be stored or shared. Your privacy is protected.
      </p>
    </div>
  );
}

export default PreCallPage;