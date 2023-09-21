import React, { useContext } from 'react';
import { datacontext } from '../../contextapi/Mycontext';
import ReactPaginate from 'react-paginate';
import { Flex } from '@chakra-ui/react';

const Pagination = ({ pageCount }) => {


    const contextdata = useContext(datacontext);
    const {
        getcowsdata,
        getcowsbirthdata,
        getMilkdata,
        getmedicalexamdata,
    } = contextdata;

    const handlePageClick = (data) => {
        getcowsdata(data.selected + 1,);
        getcowsbirthdata(data.selected + 1);
        getMilkdata(data.selected + 1);
        getmedicalexamdata(data.selected + 1);
    }
    return (
        <Flex width={'100%'} justifyContent="center" alignItems="center" my={4} >
            <ReactPaginate
                className='paginate'
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageClick}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                pageClassName="paginateitem"
                previousClassName=" paginateprevious"
                nextClassName="paginatenext"
                breakClassName="paginatebreak"
                activeClassName="paginateactive"
                pageLinkClassName="paginateitemlink"
                previousLinkClassName="paginatelinkprevious"
                nextLinkClassName="paginatelinknext"
                breakLinkClassName="paginatebreak"
            />
        </Flex>
    )
}

export default Pagination
