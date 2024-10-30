

export const FORM_CONFIG = {
    step1: {
      title: 'Personal Information',
      fields: [
      { name: 'name', label: 'First Name', type: 'text' },
        { name: 'surname', label: 'Last Name', type: 'text' }],
       
    },
    step2: {
      title: 'Personal Details',
      fields: [
        { name: 'age', label: 'Age', type: 'number' },
        {
          name: 'gender',
          label: 'Gender',
          type: 'select',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ],
        },
      ],
    },
    step3: {
      title: 'Company Information',
      fields: [
        { name: 'companyName', label: 'Company Name', type: 'text' },
        { name: 'companyCode', label: 'Company Code', type: 'text' },
      ],
    }
  };
  

  export const FormStep = ({ stepKey, formData, updateFormData }) => {
    const config = FORM_CONFIG[stepKey];

    const currentStepData = formData[stepKey];
  
    const handleChange = (field, valueOrEvent) => {

      const valueToSave = valueOrEvent?.target ? valueOrEvent.target.value : valueOrEvent;

      updateFormData(stepKey, field, valueToSave);
    };
  
    const renderField = (field) => {
      switch (field.type) {
        case 'select':
          return (
            <select
              value={currentStepData[field.name]}
              onChange={(value) => handleChange(field.name, value)}
            >
              
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
             
            </select>
          );
        default:
          return (
            <input
              type={field.type}
              value={currentStepData[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              className="w-full"
            />
          );
      }
    };
  
    return (
      <>
          {config.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>
              {renderField(field)}
            </div>
          ))}

      </>
    );
  };
  