import { Box, Button, Divider, FormControl, FormLabel, Grid, GridItem, Heading, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Select, Stack, Text, Textarea } from "@chakra-ui/react"
import { createPost, getChallenges } from "../src/api"
import {useState, useRef, useEffect} from "react"

export function CreateBlog(){

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
    const [content,setContent] = useState()
    const [file, setFile] = useState()
    const inputFile = useRef(null)
    const Max_Size = 15000000


    async function handleClick(e){
        e.preventDefault()

        console.log(chId)

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
        await createPost(object)
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
    }


    function updateChid(e){
        setChid(e.target.value)
    }


    return(
        <Box py='6dvh' px='1dvw'>
            <Heading textAlign='center' fontSize='4dvw' fontWeight='600'>this where it all starts...</Heading>
            <Text pt='1dvh' pb='3dvh' bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' >Fill in the fields below to publish your writing</Text>
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
                    <GridItem colSpan='6' py='1dvh' >
                        <FormControl>
                            <FormLabel  bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' >
                                Enter the body below or main content
                            </FormLabel>
                            <Textarea minH='20dvh' onChange={(e)=>setContent(e.target.value)} maxLength={100000} required placeholder="Something Brief is what we are looking for here... yeah like real descriptive" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan='1'>
                    <FormLabel bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' fontWeight='500' pb='1dvh' >Is this part of Challenge?</FormLabel>
                                <Select value={challenge} onChange={(e) => setChallenge(e.target.value)} required>
                                    <option value='1' >Yes</option>
                                    <option value='2' >No</option>
                                </Select>
                    </GridItem>
                    <GridItem  colSpan='3' >
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
                    <GridItem colSpan='3'>
                        <Input type="file" onChange={handleFile} required ref={inputFile} />
                    </GridItem>
                    <GridItem colSpan='3'>
                        <Button type="submit">Submit</Button>
                    </GridItem>
                </Grid>
            </form>
        </Box>
        // <form onSubmit={handleClick}>
        //      <label>Enter the title</label>
        //      <input type="text" onChange={(e)=>setTitle(e.target.value)} maxLength={50} required placeholder="enter the title"></input>
        //      <label>Enter the description</label>
        //      <input type="text" onChange={(e)=>setDescription(e.target.value)} maxLength={100} required placeholder="enter the description"></input>
        //      <label>Enter the content</label>
        //      <textarea onChange={(e)=>setContent(e.target.value)} maxLength={100000} required placeholder="enter the content"></textarea>
        //      <label>insert header image</label>
        //      <input type="file" onChange={handleFile} required ref={inputFile}></input>
        //      <button type="submit">CLICK HERE TO CREATE YOUR POST</button>
        // </form>
    )
}