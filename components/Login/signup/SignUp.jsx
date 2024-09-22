import { Heading, Text, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, FormHelperText, SimpleGrid, VStack, Button } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EML_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/


const SignUp = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)

    useEffect(()=>{
        userRef?.current?.focus();
    }, [])

    useEffect(()=>{
        const check = USER_REGEX.test(user);
        console.log(check, user)
        setValidName(check)
    },[user])

    useEffect(() => {
        const check = EML_REGEX.test(email)
        console.log(check, email)
        setValidEmail(check)
    }, [email])

    useEffect(()=>{
        const check = PWD_REGEX.test(pwd);
        console.log(check, pwd);
        setValidPwd(check)
        const match = pwd === matchPwd;
        setValidMatch(match)
    },[pwd, matchPwd])

    useEffect(()=>{
        setErrMsg('')
    }, [pwd, user, email, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

  return (
    <Section>
        <Box py='2rem' px='1rem'>

            <Box py='1rem'>
                <Heading fontSize='2rem' fontWeight='600'>Create an Account</Heading>
                <Text fontSize='1rem' fontWeight='300' >Just one step away from your solid writing career.</Text>
            </Box>

            <form onSubmit={handleSubmit}>
                <VStack gap='2rem' py='1rem'>
                <FormControl >
                    <FormLabel>
                        Username
                    </FormLabel>
                    <InputGroup>
                        <Input isInvalid={!validName && user} variant={user ? 'filled' : 'flushed'} type='text' id='username' ref={userRef} autoComplete='off' onChange={(e)=>setUser(e.target.value)} required aria-invalid={validName ? 'false' : 'true'} aria-describedby='uidnote' onFocus={()=> setUserFocus(true)} onBlur={()=> setUserFocus(false)} />
                        {user && <InputRightElement>{validName ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i> }</InputRightElement>}
                    </InputGroup>
                    <FormHelperText id='uidnote' display={user && userFocus && !validName ? "block" : "none"} ><i className="fa-solid fa-circle-info"></i>  Must begin with a letter, have no space and have 4 to 24 characters</FormHelperText>
                </FormControl>

                <FormControl >
                    <FormLabel >
                        Email
                    </FormLabel>
                    <InputGroup>
                        <Input isInvalid={!validEmail && email} variant={email ? 'filled' : 'flushed'} type='email' id='email' autoComplete='on' onChange={(e)=>setEmail(e.target.value)} required aria-invalid={validEmail ? 'false' : 'true'} aria-describedby='eidnote' onFocus={()=> setEmailFocus(true)} onBlur={()=> setEmailFocus(false)} />
                        {email && <InputRightElement>{validEmail ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i> }</InputRightElement>}
                    </InputGroup>
                    <FormHelperText id='eidnote' display={email && emailFocus && !validEmail ? "block" : "none"} ><i className="fa-solid fa-circle-info"></i>  Must be a valid email</FormHelperText>
                </FormControl>

                <FormControl >
                        <FormLabel >
                            Password
                        </FormLabel>
                        <InputGroup>
                        <Input isInvalid={!validPwd && pwd} variant={pwd ? 'filled' : 'flushed'} type='password' id='password' autoComplete='off' onChange={(e)=>setPwd(e.target.value)} required aria-invalid={validPwd ? 'false' : 'true'} aria-describedby='pidnote' onFocus={()=> setPwdFocus(true)} onBlur={()=> setPwdFocus(false)} />
                        {pwd && <InputRightElement>{validPwd ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i> }</InputRightElement>}
                        </InputGroup>
                        <FormHelperText id='pidnote' display={pwd && pwdFocus && !validPwd ? "block" : "none"} ><i className="fa-solid fa-circle-info"></i>  Your passcode must be longer than 8 characters, contain at one uppercase letter, one special character, and one number.</FormHelperText>
                </FormControl>

                {validPwd &&
                    <FormControl >
                        <FormLabel >
                            Confirm Password
                        </FormLabel>
                        <InputGroup>
                        <Input variant={matchPwd ? 'filled' : 'flushed'} type='password' id='password' autoComplete='off' onChange={(e)=>setMatchPwd(e.target.value)} required aria-invalid={validPwd ? 'false' : 'true'} aria-describedby='mpidnote' onFocus={()=> setMatchFocus(true)} onBlur={()=> setMatchFocus(false)} />
                        {matchPwd && <InputRightElement>{validMatch ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i> }</InputRightElement>}
                        </InputGroup>
                        <FormHelperText id='mpidnote' display={matchPwd && matchFocus && !validMatch ? "block" : "none"} ><i className="fa-solid fa-circle-info"></i>  Your password doesn't match.</FormHelperText>
                    </FormControl>
                }

                <Text ref={errRef} className={errMsg ? 'errmsg' : 'not-visible'} aria-live='assertive'>{errMsg}</Text>
                <Button type='submit' isDisabled={!validEmail || !validMatch || !validName || !validPwd}>Sign Up</Button>
                </VStack>
            </form>
            
        </Box>
    </Section>
  )
}

const Section = styled.section`

`

export default SignUp
