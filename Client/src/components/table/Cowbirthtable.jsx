import React, { useContext, useEffect, useState } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import Update from './../../pages/birth/form/Update';
import Delete from './../../pages/birth/form/Delete';
import Add from '../../pages/birth/form/Add';
import { SearchIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Cowbirthtable = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [boxWidth, setBoxWidth] = useState(window.innerWidth);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCowsbirthData, setFilteredCowsbirthData] = useState([]);

  const contextdata = useContext(datacontext);
  const cowsbirthdata = contextdata.cowsbirthdata;

  useEffect(() => {
    const handleResize = () => {
      setBoxWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const filteredData = cowsbirthdata.filter(cow => {
      const { id, motherid, breed, dateofentry } = cow;
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        id.toString().includes(lowerCaseQuery) ||
        motherid.toString().includes(lowerCaseQuery) ||
        breed.toLowerCase().includes(lowerCaseQuery) ||
        dateofentry.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredCowsbirthData(filteredData);
  }, [searchQuery, cowsbirthdata]);
  return (
    <Flex fontFamily={'poppins'} direction={'column'} justifyContent={'center'} width={isLargerThan768 ? boxWidth - 430 : boxWidth - 160 + 'px'} >
      <Box w='100%' h={'50px'} display={'flex'} justifyContent={'space-between'} px={'5'} alignItems={'center'}>
        <Box mr={10} >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.400' />
            </InputLeftElement>
            <Input
              type='search'
              placeholder='Search'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Add />
      </Box>
      <Box >
        <TableContainer >
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>MOTHER ID</Th>
                <Th>BREED</Th>
                <Th>BIRTH DATE</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCowsbirthData.map((cow, index) => (
                <React.Fragment key={index}>
                  <Tr>
                    <Td>{cow.id}</Td>
                    <Td>{cow.motherid}</Td>
                    <Td>{cow.breed}</Td>
                    <Td>{cow.dateofentry}</Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<BsThreeDotsVertical />}
                          variant='ghost'
                        />
                        <MenuList>
                          <Update cowid={cow.id} cowbreed={cow.breed} cowdateofentry={cow.dateofentry} />
                          <Delete cowid={cow.id} />
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>

  )
}

export default Cowbirthtable
