import React, { useContext } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  Box,
  Text,
  VStack,
  Icon,
  useMediaQuery,
  Wrap,
  WrapItem,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import brand from './../../assets/brand.svg'
import { Link } from 'react-router-dom';
import { LuMilk } from 'react-icons/lu'
import { FaBaby } from 'react-icons/fa6'
import { SlLogout } from 'react-icons/sl'
import { GiCow } from 'react-icons/gi'
import { LiaStethoscopeSolid } from 'react-icons/lia'

const Sidebar = () => {

  const contextdatapage = useContext(datacontext);
  const Profiledata = contextdatapage.Profiledata;

  axios.defaults.withCredentials = true;

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const handleLogout = () => {
    removeCookie('token');
    window.location.reload();
  };

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const location = useLocation();

  const Linkslist = [
    {
      name: 'Cow',
      route: '/',
      logo: GiCow
    },
    {
      name: 'Milk',
      route: '/milk',
      logo: LuMilk
    },
    {
      name: 'Birth',
      route: '/birth',
      logo: FaBaby
    },
    {
      name: 'Examination',
      route: '/examination',
      logo: LiaStethoscopeSolid
    },
  ];

  return (
    <Box
      fontFamily={'poppins'}
      w={isLargerThan768 ? '250px' : '80px'}
      h="100%"
      color="white"
      bg={'#111823'}
      top={0}
      left={0}
    >
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} position={'fixed'} height={'100vh'} w={isLargerThan768 ? '250px' : '80px'}>
        <Box width={'90%'} height={'150px'} display={'flex'} justifyContent={isLargerThan768 ? 'flex-start' : 'center'} alignItems={'center'} >
          <img src={brand} alt="Brand Logo" /> 
        </Box>
        <VStack width={'90%'} spacing={2}>
          {Linkslist.map((onelink, index) => (
            <ChakraLink
              fontSize={'16px'}
              fontWeight={'300'}
              transition=" 0.2s ease-in-out"
              key={index}
              borderRadius={'10px'}
              width={'100%'}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              height={'50px'}
              _hover={{ color: '#FFFFFF', bg: '#1F2937' }}
              color={location.pathname === onelink.route ? '#FFFFFF' : '#9CA3AF'}
              bg={location.pathname === onelink.route ? '#1F2937' : 'transparent'}
              as={Link}
              to={onelink.route}
              justifyContent={isLargerThan768 ? 'flex-start' : 'center'}
            >
              <Icon ml={isLargerThan768 ? '20px' : '0'} mr={isLargerThan768 ? '10px' : '0'} as={onelink.logo} />
              {isLargerThan768 && <Text fontSize={'18px'} m={0}>{onelink.name}</Text>}
            </ChakraLink>
          ))}
        </VStack>

        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} bottom={0} position={'absolute'} borderTop={'1px solid #1F2937'} width={'90%'} py={'5'} >
          <ChakraLink color={'#818CF8'} _hover={{ color: '#6a77f7' }} as={Link} to={'/profile'} pl={2} width={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
            <Wrap mr={'2'} >
              <WrapItem>
                <Avatar src={''} />
              </WrapItem>
            </Wrap>
            {isLargerThan768 &&
              <Box>
                <Text m={0} fontSize={'14'} fontWeight={'300'}>{Profiledata && Profiledata.last_name} {Profiledata && Profiledata.first_name}</Text>
                <Text fontSize={'14'} fontWeight={'300'}>{Profiledata && Profiledata.email}</Text>
              </Box>
            }
          </ChakraLink>
          <Button onClick={handleLogout} height={'50px'} fontSize={'16px'} fontWeight={'400'} _hover={{ color: '#FFFFFF', bg: '#1F2937' }} transition=" 0.2s ease-in-out" color={'#9CA3AF'} bg={'transparent'} width={'100%'} display={'flex'} justifyContent={isLargerThan768 ? 'flex-start' : 'center'} >
            <Icon mr={isLargerThan768 ? '10px' : '10px'} as={SlLogout} />
            {isLargerThan768 && 'Logout'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
