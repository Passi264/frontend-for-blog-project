import { Box, Button, Divider, Image, FormControl, FormLabel, Grid,Flex, GridItem, Heading, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Select, Stack, Text, Textarea } from "@chakra-ui/react"
import { createPost, getChallenges } from "../src/api"
import {useState, useRef, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import React from 'react'

const Content = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        async function LoadAllPosts(){
            const data = await getChallenges()
            data.sort((d1,d2)=> new Date(d2.dateCreated).getTime()- new Date(d1.dateCreated).getTime())
            setChlist( () => data)
        }
        LoadAllPosts()
    }
    ,[])

    const [chlList, setChlist] = useState("")


    const [challenge, setChallenge] = useState('2')
    const [title,setTitle] = useState()
    const [chId, setChid] = useState()
    const [description,setDescription] = useState()
    const [content,setContent] = useState("")
    const [file, setFile] = useState()
    const inputFile = useRef(null)
    const Max_Size = 15000000
    const [filePreview, setPreview] = useState()


    async function handleClick(e){
        e.preventDefault()

        if(challenge === '2' || chId === ""){
            setChid(null)
        }

        let object={
            title:title,
            description:description,
            content:content,
            author:null,
            dateCreated: new Date(),
            file: file,
            challengeId: chId

        }
        try{
            await createPost(object)
        }
        catch(error){
            console.log("Some error", error)
        }

        navigate('/home')
    }

    function handleFile(e){
        const file = e.target.files[0]
        console.log(file)
        const fileExtension = file.name.substring(file.name.lastIndexOf("."))
        if ( fileExtension!= ".jpg" && fileExtension != ".png" && fileExtension!= ".jpeg" ){
            alert("file not supported")
            inputFile.current.value=""
            inputFile.current.type = "file"
            return
        }
        if (file.size> Max_Size){
            alert("size exceeded")
            inputFile.current.value=""
            inputFile.current.type = "file"
            return
        }
        setFile(file)

        const pFile = e.target.files[0]; // Get the first file

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result); // Update state with the file data URL
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };

            reader.readAsDataURL(pFile); // Read the file as a Data URL
        }

    }


    function updateChid(e){
        setChid(e.target.value)
    }


    
  return (
    <Box py='2dvh' px='1dvw'>
    <Box py='4dvh'>
        <Heading textAlign='center'  fontSize='4dvw' fontWeight='400'>this where it all starts...</Heading>
        <Text textAlign='center' pt='1dvh' pb='3dvh' bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' >Fill in the fields below to publish your writing</Text>
    </Box>
    <Divider borderRadius='1dvw'  bgGradient='linear(to-r, #7928CA, #FF0080)'  py='.1dvh' width='100%' />
    <form onSubmit={handleClick}>
        <Grid templateColumns='repeat(6, 1fr)' py='3dvh' gap='1dvw'>
            <GridItem colSpan='2'>
                <FormControl>
                    <FormLabel  bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'  >
                        Enter the title below
                    </FormLabel>
                    <Input type="text" onChange={(e)=>setTitle(e.target.value)} maxLength={50} required placeholder="Whats gonna be the title for this? Maybe... Meowwww?" />
                </FormControl>
            </GridItem>
            <GridItem colSpan='4'>
                <FormControl>
                    <FormLabel  bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'  >
                        Enter the description below
                    </FormLabel>
                    <Input type="text" onChange={(e)=>setDescription(e.target.value)} maxLength={100} required  placeholder="Make it descriptive but not too much..." />
                </FormControl>
            </GridItem>
            <GridItem colSpan='4' py='1dvh' >
                <FormControl>
                    <FormLabel  bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' >
                        Enter the body below or main content
                    </FormLabel>
                    <JoditEditor minH='33dvh' maxLength={100000} value={content} onChange={(e)=>setContent(e.target.value)}  />
                </FormControl>
            </GridItem>
            <GridItem colSpan='2'  display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                {filePreview && 
                                <Box pt='2dvh' display='flex' justifyContent='center' alignContent='center' alignItems='center' >
                                    <Image boxSize='300px' objectFit='cover' src={filePreview} alt={`Uploaded Image`} />
                                </Box>  }
                <Box >
                        <FormControl display='flex' pt='2dvh' >
                            <FormLabel display='flex' justifyContent='center' borderRadius='10dvw' boxShadow='xl' alignItems='center' margin='0' color='white' padding='.5em 2em' bgGradient='linear(to-l, #7928CA, #FF0080)' cursor='pointer' ><i className="fa-regular fa-file"></i> &nbsp; {filePreview ? "File Uploaded" : "Upload a file"}</FormLabel>
                            <Input display='none' type='file' accept='image/*' ref={inputFile} onChange={handleFile} />
                        </FormControl>
                </Box>
            </GridItem>
            <GridItem colSpan='1'>
            <FormLabel bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' fontWeight='500' pb='1dvh' >Is this part of Challenge?</FormLabel>
                        <Select value={challenge} onChange={(e) => setChallenge(e.target.value)} required>
                            <option value='1' >Yes</option>
                            <option value='2' >No</option>
                        </Select>
            </GridItem>
            <GridItem  colSpan='5' >
                <FormLabel bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' fontWeight='500' pb='1dvh' >Select the challenge.</FormLabel>
                {challenge === '1' ? 
                    <InputGroup>
                        <InputLeftAddon borderRightRadius='0'><i className="fa-solid fa-hashtag"></i></InputLeftAddon>
                        <Select borderLeftRadius='0' value={chId} onChange={ (e) => updateChid(e)} required>
                            <option key={1.1} value="" >Please make a selection</option>
                            {chlList && chlList.map((e, index) => (
                                <option key={index} value={e._id} >{e.title}</option>
                            ) )}
                        </Select>
                    </InputGroup>
                : 
                <Input color='tomato' variant='filled' readOnly type="text" value="This is going to be individual post" /> }
            </GridItem>
            <GridItem colSpan='6' py='2dvh' display='flex' justifyContent='center'>
                <Button boxShadow='xl' py='3dvh' width='50%' bgGradient='linear(to-l, #7928CA, #FF0080)'  color='white' fontSize='1.2dvw' borderRadius='3dvw' type="submit">Submit</Button>
            </GridItem>
            <GridItem colSpan='6' py='1dvh'>
                <Divider borderRadius='1dvw'  bgGradient='linear(to-r, #7928CA, #FF0080)'  py='.1dvh' width='100%' />
            </GridItem>
        </Grid>
    </form>
</Box>
  )
}

export default Content
