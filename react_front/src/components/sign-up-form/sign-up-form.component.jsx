import {useState} from 'react';
import {createAuthUserWithEmailAndPassword} from "../../pages/utils/auth.utils";

const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {name, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password must match");
            return
        }
        try {
          await  createAuthUserWithEmailAndPassword(name, email, password)
        } finally {
            resetFormFields()
        }
    }
    return (
        <div>
            <h1>Sing up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="name"
                    value={name}
                />
                <label>Email</label>
                <input
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <label>Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <button type="submit"> Sing Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
