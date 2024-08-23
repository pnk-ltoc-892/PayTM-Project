import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'

import axios from 'axios'

function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='bg-slate-900 h-screen flex justify-center' >
            <div className='flex flex-col justify-center' >
                <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-6' >
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox placeholder={"John"} label={"First Name"}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                    <InputBox placeholder={"Doe"} label={"Last Name"}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}                    
                    />
                    <InputBox placeholder={"pnk123@co.in"} label={"Email"} 
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }} 
                    />
                    <InputBox placeholder={"123456"} label={"Password"} 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} 
                    />
                    <div className='pt-4'>
                        <Button label={"Sign Up"} 
                            OnClick={async () => {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup",
                                    {
                                        username,
                                        fullname: firstName + " " + lastName,
                                        password
                                    }
                                )
                                // Store The Token In Local Storage
                                localStorage.setItem("token", response.data.token)
                            }}
                        />
                    </div>
                        <BottomWarning label={"Already have an account?"} 
                                buttonText={"Sign in"}
                                to={"/signin"}
                        />
                </div>
            </div>
        </div>
    )
}

export default SignUp