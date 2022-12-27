import { useState } from 'react'

const useMultiStepForm = (formArray, fields, validate) => {
    const [currentStep, setCurrentStep] = useState(0)

    const nextStep = () => {
        const validator = validate(currentStep)
        const messages = []

        for(var i = 0 ; i < fields[currentStep].length ; i++){
            if(validator[i] === false){
                messages.push(`Enter validate ${fields[currentStep][i]}`)
            }
        }

        if(messages.length > 0){
            alert(messages.join('\n'))
        } else {
            setCurrentStep((prev) => {
                if (currentStep >= formArray.length - 1) return prev
    
                return prev + 1
            })
        }
    }


    const prevStep = () => { 
        setCurrentStep((prev) => {
            if (currentStep <= 0) return prev

            return prev - 1
        })
    }

    const takeToStep = (step) => {
        setCurrentStep(()=>{
            return step - 1
        })
    }

    const isLastStep = (currentStep === formArray.length - 1) ? true : false
    const isFirstStep = (currentStep === 0) ? true : false

    return {
        currentStep,
        isFirstStep,
        isLastStep,
        step: formArray[currentStep],
        nextStep,
        prevStep,
        takeToStep
    }

}

export default useMultiStepForm
