import React from 'react';

import ReactPagination from 'react-paginate';

import './style.less';

const Pagination = ({
  page,
  countPages,
  onChange,
}) => (
  <ReactPagination
    className="pagination"
    breakLabel="..."
    nextLabel="вперёд >"
    forcePage={page - 1}
    onPageChange={({ selected }) => onChange(selected + 1)}
    pageRangeDisplayed={5}
    pageCount={countPages}
    previousLabel="< назад"
    renderOnZeroPageCount={null}
  />
);

export default Pagination;
