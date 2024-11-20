import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, CheckCircle, ArrowLeft, User, Mail } from 'lucide-react';
import { PhoneInput } from '../components/PhoneInput';
import type { CountryCode } from '../components/CountryCodeSelect';

const preCallContent = {
  depression: {
    title: 'Depression Screening (PHQ-9)',
    experience: [
      'Complete PHQ-9 questionnaire',
      'Discuss symptom changes',
      'Track treatment progress',
      'Identify areas of concern'
    ],
    callType: 'phq_9'
  },
  medication: {
    title: 'Medication Adherence Monitoring',
    experience: [
      'Medication adherence check',
      'Side effect monitoring',
      'Barrier identification',
      'Resource coordination'
    ],
    callType: 'medication_adherence'
  },
  treatment: {
    title: 'Treatment Response Assessment',
    experience: [
      'Progress evaluation',
      'Quality of life assessment',
      'Treatment effectiveness review',
      'Care plan adjustment discussion'
    ],
    callType: 'treatment_response'
  }
};

const countryCodes: CountryCode[] = [
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+353', country: 'IE', flag: '🇮🇪' }, 
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' }
];

function PreCallPage() {
  const { type } = useParams<{ type: keyof typeof preCallContent }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [countryCode, setCountryCode] = useState<CountryCode>(countryCodes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const content = type ? preCallContent[type] : null;

  if (!content) {
    return <div>Invalid assessment type</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = {
      call_type: content.callType,
      phone_number: countryCode.code + formData.phoneNumber,
      name: formData.name,
      email: formData.email
    };

    try {
      const response = await fetch('https://g8yt9rfao4.execute-api.us-east-1.amazonaws.com/v1/start_call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      alert('Call initiated successfully! You will receive a call shortly.');
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to initiate call. Please try again.');
      }

      
    } catch (err) {
      //setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <PhoneInput
              phoneNumber={formData.phoneNumber}
              countryCode={countryCode}
              onPhoneNumberChange={handleInputChange}
              onCountryCodeChange={setCountryCode}
              countryCodes={countryCodes}
            />
            <p className="mt-2 text-sm text-gray-500">
              We need your phone number so the AI can call you for the demo. Don't worry, we won't save your information.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors ${
              isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Initiating Call...
              </>
            ) : (
              <>
                <Phone className="mr-2 h-5 w-5" />
                Call me!
              </>
            )}
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