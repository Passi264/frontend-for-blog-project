import { Box, Button, Card, Center, Heading, FormControl, FormLabel, Input, Grid, GridItem, Image, Textarea, Select, InputGroup, InputLeftAddon, Flex, Text } from "@chakra-ui/react"
import { useSteps, Step, Steps } from "chakra-ui-steps"
import { createPost, getChallenges } from "../src/api"
import { useNavigate } from "react-router-dom";
import {useState, useRef, useEffect, useCallback} from "react"
import JoditEditor from "jodit-react";
import JoditConfig from "../components/JodEditor";


export function CreateBlog(){
    // All the states for inputs 
    const editor = useRef(null)
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

    // this is to declare the navigation
    const navigate = useNavigate();

    // defining the steps in form
    const {activeStep, nextStep, prevStep, reset} = useSteps({initialStep: 0})

    // this will make sure that the step count doesn't go more than 2
    const handleSteps = () => {
        if(activeStep >= 2){
            console.log('Form Submitted')
        }
        else{
            nextStep()
        }
    }

    // this is to render out active Challenges and sort them from latest to old
    useEffect(()=>{
        async function LoadAllPosts(){
            const data = await getChallenges()
            data.sort((d1,d2)=> new Date(d2.dateCreated).getTime()- new Date(d1.dateCreated).getTime())
            setChlist( () => data)
        }
        LoadAllPosts()
    }
    ,[])

    //this is going to submit data to the database
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

            //this is to navigate the user to homepage after successful submit
            navigate('/home')
        }


        // this function will be handling file uploads and previewing them as output too
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
    
    const handleChange = (newContent) => setContent(newContent)

    function updateChid(e){
            setChid(e.target.value)
    }

return(
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' pb='3dvh' px='1dvw'>
            <Heading bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' pt='4dvh' textAlign='center' fontSize='5dvh' as='h1'>Create a Post</Heading>
            <Text pb='4dvh' >This is where you start to the top</Text>
            <Card width='80%' p='5dvh 6dvw' borderRadius='1.5dvw' boxShadow='2xl'>
                <form onSubmit={handleClick} >
                    <Steps colorScheme="pink" activeStep={activeStep}>
                        <Step label='Title & Description'>
                            <Grid px='2dvw' py='4dvh' templateColumns='repeat(8,1fr)' templateRows='repeat(6,1fr)'>

                                {/* this grid item is the left side of the form, which will have title and description */}
                                <GridItem colSpan='5' rowSpan='6'>
                                    <FormControl py='1dvh'>
                                        <FormLabel  bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'  >
                                            Enter the title below
                                        </FormLabel>
                                        <Input type="text" onChange={(e)=>setTitle(e.target.value)} maxLength={50} required placeholder="Whats gonna be the title for this? Maybe... Meowwww?" />
                                    </FormControl>
                                    <FormControl py='1dvh'>
                                        <FormLabel  bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text'  >
                                            Enter the description below
                                        </FormLabel>
                                        <Textarea height='19dvh' maxH='21dvh' onChange={(e)=>setDescription(e.target.value)} maxLength={160} required  placeholder="Make it descriptive but not too much..." />
                                    </FormControl>
                                </GridItem>

                                {/* this side of the grid is responsible for the image preview and image upload button  */}
                                <GridItem colSpan='3' rowSpan='8'  display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                                    {filePreview && 
                                        <Box pt='2dvh' display='flex' justifyContent='center' alignContent='center' alignItems='center' >
                                            <Image borderRadius='1.5dvw' style={{ width: '30dvw', height: 'auto', maxHeight: '25dvh' }} objectFit='cover' src={filePreview} alt={`Uploaded Image`} />
                                        </Box>  }
                                        <Box >
                                            <FormControl display='flex' pt='2dvh' >
                                                <FormLabel display='flex' justifyContent='center' borderRadius='10dvw' boxShadow='xl' alignItems='center' margin='0' color='white' padding='.5em 2em' bgGradient='linear(to-l, #7928CA, #FF0080)' cursor='pointer' ><i className="fa-regular fa-file"></i> &nbsp; {filePreview ? "File Uploaded" : "Upload a file"}</FormLabel>
                                                <Input display='none' type='file' accept='image/*' ref={inputFile} onChange={handleFile} />
                                            </FormControl>
                                        </Box>
                                </GridItem>

                            </Grid>
                        </Step>

                        <Step label='Content'>
                            <Box px='2dvw' py='4dvh' height='100%'>
                                <JoditEditor ref={editor} config={JoditConfig} onChange={content => setContent(content)} />
                            </Box>
                        </Step>

                        <Step label='Additional Information'>
                            <Box px='2dvw' py='4dvh'>
                                <Box py='1dvh'>
                                    <FormLabel bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' fontWeight='500' pb='.5dvh' >Is this part of Challenge?</FormLabel>
                                    <Select value={challenge} onChange={(e) => setChallenge(e.target.value)} required>
                                        <option value='1' >Yes</option>
                                        <option value='2' >No</option>
                                    </Select>
                                </Box>
                                <Box py='1dvh'>
                                    <FormLabel bgGradient='linear(to-r, #7928CA, #FF0080)' bgClip='text' fontWeight='500' pb='.5dvh' >Select the challenge.</FormLabel>
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
                                </Box>
                            </Box>
                        </Step>

                    </Steps>
                    <Flex justify='space-between' >
                        <Button borderRadius='9999px' bg='pink.400' color='white' p='1px' isDisabled={activeStep < 1 ? true : false} onClick={()=> prevStep()}><i className="fa-solid fa-arrow-left"></i></Button>
                        <Button borderRadius='9999px'  bg='pink.400' color='white' p='1px' isDisabled={activeStep >= 2 ? true : false} onClick={handleSteps} ><i className="fa-solid fa-arrow-right"></i></Button> 
                    </Flex>
                    <Flex justify='center' display={activeStep >= 2 ? 'flex' : 'none'} >
                        <Button boxShadow='xl' py='3dvh' width='50%' bgGradient='linear(to-l, #7928CA, #FF0080)'  color='white' fontSize='1.2dvw' borderRadius='3dvw' isDisabled={activeStep >= 2 ? false : true} type="submit">Submit</Button> 
                    </Flex>
                </form>
            </Card>
        </Box>
    )
}