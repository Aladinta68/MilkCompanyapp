import React, { useContext, useEffect, useState } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import Update from './../../pages/medicalexam/form/Update';
import Delete from './../../pages/medicalexam/form/Delete';
import Add from '../../pages/medicalexam/form/Add';
import { SearchIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Medicalexamtable = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [boxWidth, setBoxWidth] = useState(window.innerWidth);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredmedicalexamData, setFilteredmedicalexamData] = useState([]);

  const contextdata = useContext(datacontext);
  const medicalexamdata = contextdata.medicalexamdata;

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
    const filteredData = medicalexamdata.filter(exam => {
      const { id, cowid, disease, dateofexamination } = exam;
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        id.toString().includes(lowerCaseQuery) ||
        cowid.toString().includes(lowerCaseQuery) ||
        disease.toLowerCase().includes(lowerCaseQuery) ||
        dateofexamination.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredmedicalexamData(filteredData);
  }, [searchQuery, medicalexamdata]);
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
                <Th>COW ID</Th>
                <Th>DATE</Th>
                <Th>DISEASE</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredmedicalexamData.map((exam, index) => (
                <React.Fragment key={index}>
                  <Tr>
                    <Td>{exam.id}</Td>
                    <Td>{exam.cowid}</Td>
                    <Td>{exam.dateofexamination}</Td>
                    <Td>{exam.disease}</Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<BsThreeDotsVertical />}
                          variant='ghost'
                        />
                        <MenuList>
                          <Update examid={exam.id} cowid={exam.cowid} examdate={exam.dateofexamination} examdisease={exam.disease} />
                          <Delete examid={exam.id} />
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

export default Medicalexamtable
