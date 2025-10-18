"use client";

import React, { useCallback, useState } from "react";
import "./form.css";

// === Constants ===
enum QuestionType {
  Text,
  Number,
  Select,
  Radio,
}

// === Types ===
interface Question {
  id: string;
  label: string;
  text?: string;
  disable?: boolean;
  type: QuestionType;
  options?: string[];
  validator?: (value: string) => string | undefined;
}

interface FormErrors {
  [key: string]: string;
}

interface CustomFormProps {
  formSchema: unknown; // Reserved for future use
  onSubmit: (data: Question[]) => void;
}

// === Sample Questions (can be passed as props later) ===
const defaultQuestions: Question[] = [
  {
    id: "1",
    label: "Last Name",
    text: "A",
    type: QuestionType.Text,
  },
  {
    id: "2",
    label: "First Name",
    text: "Z",
    type: QuestionType.Text,
  },
  {
    id: "3",
    label: "Age",
    text: "1",
    type: QuestionType.Number,
    validator: (value: string) => {
      const num = Number(value);
      if (isNaN(num) || num < 4 || num > 99) {
        return "Age should be between 4 and 99";
      }
    },
  },
  {
    id: "4",
    label: "Hobby",
    text: "please select",
    type: QuestionType.Select,
    options: ["read", "travel", "swim"],
  },
];

// === Component: CustomForm ===
const CustomForm: React.FC<CustomFormProps> = ({ formSchema, onSubmit }) => {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [errors, setErrors] = useState<FormErrors>({});

const handleInputChange = (
  idx: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const value = e.target.value;
  const updatedQuestions = [...questions];
  const question = updatedQuestions[idx];

  // Validate input
  const error = question.validator?.(value);
  setErrors((prev) => {
    const newErrors = { ...prev };
    if (error) {
      newErrors[question.label] = error;
    } else {
      delete newErrors[question.label]; // Remove key if no error
    }
    return newErrors;
  });

  // Update question value
  updatedQuestions[idx] = {
    ...question,
    text: value,
  };
  setQuestions(updatedQuestions);
};

  const renderInput = (question: Question, idx: number) => {
    const value = question.text ?? "";
    const commonProps = {
      value,
      disabled: question.disable,
      onChange: (e: React.ChangeEvent<any>) => handleInputChange(idx, e),
    };

    switch (question.type) {
      case QuestionType.Text:
      case QuestionType.Number:
        return <input type="text" {...commonProps} />;

      case QuestionType.Select:
        return (
          <select {...commonProps}>
            <option value="">-- Select --</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case QuestionType.Radio:
        return (
          <>
            {question.options?.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleInputChange(idx, e)}
                  disabled={question.disable}
                />
                {option}
              </label>
            ))}
          </>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((msg) => msg);
    if (hasErrors) {
      alert("Please fix the errors before submitting.");
      return;
    }

    onSubmit(questions);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={q.id} className="form-group">
            <label htmlFor={`question-${q.id}`}>{q.label}</label>
            {renderInput(q, idx)}
            {errors[q.label] && (
              <div className="form-error">{errors[q.label]}</div>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// === Component: Form (Wrapper) ===
const Form: React.FC = () => {
  const handleSubmit = useCallback((data: Question[]) => {
    console.log("Form submitted:", data);
  }, []);

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="form-container">
          <CustomForm formSchema={null} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Form;