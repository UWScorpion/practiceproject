"use client";
import React from "react";
import "./form.css";
import { useCallback, useState } from "react";

const formSchema = null;

interface Question {
  id: string;
  label: string;
  text?: string;
  disable?: boolean;
  type: QuestionType;
  options?: string[];
  validator?: (value: string) => string | undefined;
}

interface Error {
  [key: string]: string;
}

enum QuestionType {
  Text,
  Number,
  Select,
  Radio,
}

type CustomFormProps = {
  formSchema: unknown;
  onSubmit: (data: Question[]) => void;
};

const CustomForm = ({ formSchema, onSubmit }: CustomFormProps) => {
  const [questionData, setQuestionData] = useState([
    {
      id: "1",
      label: "last name",
      text: "A",
      disable: false,
      type: QuestionType.Text,
    },
    {
      id: "2",
      label: "first name",
      text: "Z",
      disable: false,
      type: QuestionType.Text,
    },
    {
      id: "3",
      label: "age",
      text: "1",
      disable: false,
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
      label: "hobby",
      text: "please select",
      disable: false,
      type: QuestionType.Select,
      options: ["read", "travel", "swim"],
    },
  ] as Question[]);
  const [errors, setErrors] = useState({});

  const getQuestionValue = (idx: number) => {
    return questionData[idx].text ?? "";
  };

  const validateInput = (input: string, question?: Question) => {
    const newErrors = {} as Error;
    if (question?.validator) {
      const error = question.validator(input);
      if (error) {
        newErrors[question.label] = error;
      }
    }
    console.log(" newErrors", question?.validator, newErrors);
    setErrors(newErrors);
  };

  const handleTextchange = (
    idx: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    question?: Question
  ) => {
    validateInput(e.target.value, question);
    const updatedData = [...questionData];
    updatedData[idx] = {
      ...updatedData[idx],
      text: e.target.value,
    };
    setQuestionData(updatedData);
  };

  const getQuestion = (question: Question, idx: number) => {
    if (question.type === QuestionType.Text) {
      return (
        <input
          type="text"
          value={getQuestionValue(idx)}
          onChange={(e) => handleTextchange(idx, e, question)}
        ></input>
      );
    } else if (question.type === QuestionType.Number) {
      return (
        <input
          type="text"
          value={getQuestionValue(idx)}
          onChange={(e) => handleTextchange(idx, e, question)}
        ></input>
      );
    } else if (question.type === QuestionType.Select) {
      return (
        <select
          value={getQuestionValue(idx)}
          onChange={(e) => handleTextchange(idx, e)}
        >
          {questionData[idx].options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="radio"
        value={getQuestionValue(idx)}
        onChange={(e) => handleTextchange(idx, e)}
      ></input>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("Please fix the errors before submitting the form.");
      return;
    }
    onSubmit(questionData);
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {questionData.map((question, idx) => (
          <div key={question.id}>
            <label>{question.label}</label>
            {getQuestion(question, idx)}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {Object.keys(errors).length > 0 ? (
        <div>{JSON.stringify(errors)}</div>
      ) : (
        ""
      )}
    </div>
  );
};

const Form = () => {
  const onSubmit = useCallback((obj: Question[]) => {
    console.log(obj);
  }, []);

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="form-container">
          <CustomForm formSchema={formSchema} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Form;
