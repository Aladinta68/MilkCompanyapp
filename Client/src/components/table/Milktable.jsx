import React, { useContext, useEffect, useState } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import Update from './../../pages/milk/form/Update';
import Delete from './../../pages/milk/form/Delete';
import Add from '../../pages/milk/form/Add';
import { SearchIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Milktable = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [boxWidth, setBoxWidth] = useState(window.innerWidth);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredmilkData, setFilteredmilkData] = useState([]);

  const contextdata = useContext(datacontext);
  const Milkdata = contextdata.Milkdata;

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
    const filteredData = Milkdata.filter(milk => {
      const { id, date, quantity } = milk;
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        id.toString().includes(lowerCaseQuery) ||
        date.toLowerCase().includes(lowerCaseQuery) ||
        quantity.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredmilkData(filteredData);
  }, [searchQuery, Milkdata]);
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
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>QUANTITY(Litre)</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredmilkData.map((milk, index) => (
                <React.Fragment key={index}>
                  <Tr>
                    <Td>{milk.id}</Td>
                    <Td>{milk.date}</Td>
                    <Td>{milk.quantity}</Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<BsThreeDotsVertical />}
                          variant='ghost'
                        />
                        <MenuList>
                          <Update milkid={milk.id} milkdate={milk.date} milkquantity={milk.quantity} />
                          <Delete milkid={milk.id} />
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

export default Milktable
