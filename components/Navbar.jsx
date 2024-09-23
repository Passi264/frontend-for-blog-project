import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import * as jwt_decode from "jwt-decode";
import { Avatar, Box, Button, ButtonGroup, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react";
import DataContext from "../src/dataContext";

export function Navbar(){
  const navigate= useNavigate()

  const {updateLog, login} = useContext(DataContext)

  function handleLogout(){
    sessionStorage.removeItem("User")
    updateLog()
    // navigate("./")
  }

  const [user,setUser] = useState()

  useEffect(()=>{
    const token = sessionStorage?.getItem("User")

    if(token){
      const decodeUser = jwt_decode?.jwtDecode(token)
      setUser(decodeUser)
    }
    else{
      setUser(null)
    }

  }, [login])

  return(
    <Flex p='2rem 1rem' justify='space-between' align='center'>
      <Flex gap='2rem' align='center'>
        <Link to='/'>
          <Heading fontWeight='400' fontSize='1rem' >CopyWriter</Heading>
        </Link>
        <InputGroup>
          <InputLeftElement>
            <i className="fa-solid fa-magnifying-glass"></i>
          </InputLeftElement>
          <Input max-width='30rem' minW='' htmlSize='40' variant='filled' type="text" placeholder="Search for challenges here..." />
        </InputGroup>
      </Flex>
      <Flex justify='space-between' gap='1rem' align='center'>
        <Button as={Link} to='/CreateBlog' leftIcon={<i className="fa-solid fa-pen"></i>} >
            Start Writing
        </Button>
        {user ? 
            <Menu>
              <MenuButton>
                <Avatar size='md' name={user?.name} />
              </MenuButton>
              <MenuList py='1dvh'>
                <MenuItem as={Link} to='/Profile'>
                  Profile
                </MenuItem>
                <MenuItem as={Link} to='/Contact'>
                  Contact us
                </MenuItem>
                <MenuItem as={Link} to='/About'>
                  About us
                </MenuItem>
                <Divider />
                <MenuItem as={Button} onClick={handleLogout} rightIcon={<i className="fa-solid fa-arrow-right"></i>} px='2dvw' >
                  Log out
                </MenuItem>
              </MenuList>
          </Menu>
        : <Button as={Link} to='/login' >Log in</Button>}
      </Flex>
    </Flex>
        // <div className="navbar">
        //   {pageData.map((page)=>{
        //     return(
        //         <Link className="navitem" to={page.path}><button>{page.name}</button></Link>
        //     )
        //   }
        // )}
        // <button onClick={handleLogout}>LOG OUT</button>
        // </div>
    )
    }