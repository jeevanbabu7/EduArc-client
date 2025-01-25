import react, {createContext, useState} from 'react';   

export const FormContext = createContext();

export const FormProvider = ({children}) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        class: '',
        favTopis: [],
        favSubjects: []
    });

    return (
        <FormContext.Provider value={{form, setForm}}>
            {children}
        </FormContext.Provider>
    )
}