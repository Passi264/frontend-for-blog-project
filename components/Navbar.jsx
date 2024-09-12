import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import * as jwt_decode from "jwt-decode";
import { Avatar, Box, Button, ButtonGroup, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useEffect, useState } from "react";
export function Navbar(){
  const navigate= useNavigate()
  function handleLogout(){
    sessionStorage.removeItem("User")
    navigate("./")
  }

  const [user,setUser] = useState({})

  useEffect(()=>{
    const token = sessionStorage.getItem("User")
    const decodeUser = jwt_decode.jwtDecode(token)
    setUser(decodeUser)
  }, [])

  return(
    <Flex p='2.5dvh 1dvw' justify='space-between' align='center'>
      <Flex gap='2dvw' align='center'>
        <Link to='/Home'>
          <Heading fontWeight='400' fontSize='1.5dvw' >CopyWriter</Heading>
        </Link>
        <InputGroup>
          <InputLeftElement>
            <i className="fa-solid fa-magnifying-glass"></i>
          </InputLeftElement>
          <Input borderRadius='1.5dvw' htmlSize='40' variant='filled' type="text" placeholder="Search for challenges here..." />
        </InputGroup>
      </Flex>
      <Flex gap='1dvw' align='center'>
        <Button py='2.5dvh' as={Link} to='/CreateBlog' borderRadius='1.5dvw' leftIcon={<i className="fa-solid fa-pen"></i>} >
            Start Writing
        </Button>
        <Menu>
          <MenuButton>
            <Avatar name={user.name} />
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