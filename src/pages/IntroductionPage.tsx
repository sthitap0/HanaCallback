import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const introContent = {
  depression: {
    title: 'Depression Screening (PHQ-9)',
    content: "You'll step into the shoes of Alex Thompson, a 35-year-old experiencing symptoms of depression. Your healthcare provider has recommended regular PHQ-9 assessments to monitor your symptoms and treatment progress.\n\nThe PHQ-9 is a validated screening tool that helps measure depression severity and track changes over time. This assessment will help your care team understand how you're feeling and adjust your treatment plan if needed."
  },
  medication: {
    title: 'Medication Adherence Monitoring',
    content: "You'll step into the shoes of Jordan Chen, a 52-year-old who recently started a complex medication regimen. After being diagnosed with treatment-resistant depression, Jordan was prescribed multiple medications including an antidepressant and mood stabilizer...\n\nTheir care team wants to ensure medication adherence and monitor for any potential barriers to treatment success."
  },
  treatment: {
    title: 'Treatment Response Assessment',
    content: "You'll step into the shoes of Sarah Martinez, a 38-year-old three months into an integrated treatment plan for chronic pain and depression. Sarah's healthcare team has implemented a multi-modal approach combining medication, physical therapy, and counseling...\n\nThe care team wants to evaluate treatment effectiveness and make any necessary adjustments to optimize outcomes."
  }
};

function IntroductionPage() {
  const { type } = useParams<{ type: keyof typeof introContent }>();
  const navigate = useNavigate();
  const content = type ? introContent[type] : null;

  if (!content) {
    return <div>Invalid assessment type</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to assessments
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h1>
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {content.content}
        </p>
      </div>
      <button
        onClick={() => navigate(`/pre-call/${type}`)}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        Continue
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
}

export default IntroductionPage;