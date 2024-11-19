import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentCard = ({ title, description, image, onClick }: {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100"
  >
    <div className="h-64 w-full overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

function LandingPage() {
  const navigate = useNavigate();

  const assessments = [
    {
      id: 'depression',
      title: 'Depression Screening (PHQ-9)',
      description: 'Complete a validated PHQ-9 assessment to monitor depression symptoms and track treatment progress.',
      image: 'https://cdn.prod.website-files.com/66d8df543029dd65661ce227/67374db19b8f787c3a3ac2b2_a%20person%20holding%20a%20c.jpg'
    },
    {
      id: 'medication',
      title: 'Medication Adherence Monitoring',
      description: 'Track medication compliance and identify barriers to treatment success.',
      image: 'https://cdn.prod.website-files.com/66d8df543029dd65661ce227/67374da54aec1779e5579b2d_a%20person%20holding%20a%20p%20(1).jpg'
    },
    {
      id: 'treatment',
      title: 'Treatment Response Assessment',
      description: 'Evaluate treatment effectiveness and optimize care plans.',
      image: 'https://cdn.prod.website-files.com/66d8df543029dd65661ce227/67374dad964c848ab0907347_a%20person%20looking%20at.jpg'
    }
  ];

  return (
    <div className="text-center">
      <h1 className="heading-font text-6xl text-gray-900 mb-4">
        AI Assistants that can talk to your patients
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Choose your journey
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {assessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            title={assessment.title}
            description={assessment.description}
            image={assessment.image}
            onClick={() => navigate(`/intro/${assessment.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;