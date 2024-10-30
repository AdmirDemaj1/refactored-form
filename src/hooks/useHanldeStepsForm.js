import { useState, useEffect } from 'react';
const FORM_CONFIG = {
  steps: ['step1', 'step2', 'step3'] ,
  minStep: 1,
  maxStep: 3,
};


const INITIAL_FORM_DATA = {
  step1: { name: '', surname: '' },
  step2: { age: '', gender: 'male' },
  step3: { companyName: '', companyCode: '' },
};


const STORAGE_KEYS = {
  FORM_DATA: 'formData',
  CURRENT_STEP: 'currentStep',
} ;

const useMultiStepForm = () => {

  const getStoredData = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? key === STORAGE_KEYS.CURRENT_STEP ? JSON.parse(item) + 1 : JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return defaultValue;
    }
  };

  // Initialize state with stored data or defaults
  const [formData, setFormData] = useState(() => 
    getStoredData(STORAGE_KEYS.FORM_DATA, INITIAL_FORM_DATA)
  );
  
  const [currentStep, setCurrentStep] = useState(() => 
    getStoredData(STORAGE_KEYS.CURRENT_STEP, FORM_CONFIG.minStep)
  );

  const saveToStorage = (key, value) => {
    try {
      
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  };


  const updateFormData = (
    step,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

 
  const nextStep = () => {
    setCurrentStep((prev) => 
      prev < FORM_CONFIG.maxStep ? prev + 1 : prev
    );

    saveToStorage(STORAGE_KEYS.FORM_DATA, formData);
    saveToStorage(STORAGE_KEYS.CURRENT_STEP, currentStep);
  };

  const prevStep = () => {
    setCurrentStep((prev) => 
      prev > FORM_CONFIG.minStep ? prev - 1 : prev
    );
  };

  const goToStep = (step) => {
    if (step >= FORM_CONFIG.minStep && step <= FORM_CONFIG.maxStep) {
      setCurrentStep(step);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(FORM_CONFIG.minStep);
    localStorage.clear()
  };

  // Validation utilities
  const isFirstStep = () => currentStep === FORM_CONFIG.minStep;
   const isLastStep = () => currentStep === FORM_CONFIG.maxStep;
  const getCurrentStepKey = () => FORM_CONFIG.steps[currentStep - 1];
  
  const isStepComplete = (step) => {
    const stepData = formData[step];

    return Object.values(stepData).every(value => value.trim() !== '');
  };

  return {
    formData,
    currentStep,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    isFirstStep,
    isLastStep,
    getCurrentStepKey,
    isStepComplete,
  };
};

export default useMultiStepForm;