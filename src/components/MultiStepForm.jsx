import React from 'react';

import useMultiStepForm from '../hooks/useHanldeStepsForm';
import { FormStep } from './ReusableForm';

const MultiStepForm = () => {
  const {  formData , updateFormData , currentStep, nextStep, prevStep, getCurrentStepKey, isStepComplete, isLastStep, resetForm } = useMultiStepForm();

  const handleSubmit = () => {
    const currentStep = getCurrentStepKey();
   
    if (isStepComplete(currentStep)) {
      if (isLastStep()) {
        nextStep();
        resetForm();
        
      } else {
        nextStep();
      }
    }
  };
  
  return (
    <div>
      <h1>Multi-Step Form</h1>
      <FormStep stepKey={getCurrentStepKey()} formData= {formData} updateFormData={updateFormData} />

      <div>
        {currentStep > 1 && <button onClick={prevStep}>Back</button>}
        { <button onClick={handleSubmit}>{currentStep < 3 ? 'Next' : 'SUBMIT'}</button>}
      </div>
    </div>
  );
};

export default MultiStepForm;
