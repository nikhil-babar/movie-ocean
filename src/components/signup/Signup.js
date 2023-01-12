import React from "react";
import useMultiStepForm from "../../customHooks/useMultiStep";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {axiosClient} from "../../api/axiosClient";
import useAuth from "../../customHooks/useAuth";

const initialFormData = {
    name: "",
    age: "",
    gender: "male",
    userName: "",
    password: "",
    bio: "",
};

const Signup = () => {
    const [formData, setFormData] = useState(initialFormData);
    const fields = [["name", "age", "gender"], ["userName", "password"], ["bio"]];
    const navigate = useNavigate()
    const { setAuth } = useAuth()

    const submitForm = () => {
        axiosClient.post('/user/createAccount', formData)
            .then((response) => {
                setAuth({...response.data})

                navigate('/home')
            }).catch((err) => {
                switch (err.response?.status) {
                    case 409:
                        takeToStep(2)
                        alert('Username already taken')
                        break;

                    default:
                        break;
                }
            })
    }

    const validate = (currentStep) => {
        return fields[currentStep].map((field) => {
            if (typeof formData[field] === 'undefined' || formData[field] === null || formData[field].length === 0) {
                return false
            }

            switch (field) {
                case "name":
                    if (formData[field].match(/(\n|[^a-zA-Z\s])/)) {
                        return false
                    }
                    break
                case "age":
                    if (isNaN(formData[field]) || Number(formData[field]) < 10 || Number(formData[field] > 110)) {
                        return false
                    }
                    break
                case "bio":
                    if (!formData[field].match(/\S/)) {
                        return false
                    }
                    break
                case "gender":
                    break
                case "userName":
                    if (formData[field].match(/(\n|\s|[^a-zA-Z[0-9]]|(^[^a-zA-Z]))/)) {
                        return false
                    }
                    break
                case "password":
                    if (formData[field].match(/(\n|\s)/)) {
                        return false
                    }
                    break
                default:
                    return false
            }

            return true;
        });
    };

    const onChange = (data) => {
        setFormData(prev => {
            return { ...prev, ...data }
        })
    }

    const { step, nextStep, prevStep, isFirstStep, isLastStep, takeToStep } =
        useMultiStepForm(
            [
                <Step1 formData={formData} onChange={onChange} />,
                <Step2 formData={formData} onChange={onChange} />,
                <Step3 formData={formData} onChange={onChange} />,
            ],
            fields,
            validate
        );

    return (
        <>
            <div className="text-white text-center w-2/3 mx-auto h-fit mt-36 max-w-sm px-3 sm:px-5">
                <p className="text-3xl my-8">Sign up</p>
                {step}
                <div className="mt-20 flex justify-between">
                    {!isFirstStep && (
                        <button
                            className="bg-blue-600 w-1/3 ml-0"
                            onClick={() => prevStep()}
                        >
                            Previous
                        </button>
                    )}
                    <button className="bg-blue-600 w-1/3 mr-0" onClick={(!isLastStep) ? () => nextStep() : () => submitForm()}>
                        {isLastStep ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Signup;
