import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import mainActions from 'store/main/actions';
import { itemsPerPageList } from 'store/main/reducer';

import Pagination from 'components/Pagination';

const {
  setPage,
  setItemsPerPage,
} = mainActions;

const ActionsBlock = () => {
  const dispatch = useDispatch();

  const {
    items,
    itemsPerPage,
    page,
  } = useSelector((state) => state.main);

  const countPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="actions">
      {
          countPages > 1
            ? (
              <Pagination
                page={page}
                countPages={Math.ceil(items.length / itemsPerPage)}
                onChange={(value) => dispatch(setPage(value))}
              />
            )
            : <div />
        }

      <div className="actions_items-per-page">
        <span>Кол-во на странице:&nbsp;</span>
        <select
          value={itemsPerPage}
          onChange={(e) => dispatch(setItemsPerPage(+e.target.value))}
        >
          {
              _.map(itemsPerPageList, (item) => (
                <option key={item} value={item}>{item}</option>
              ))
            }
        </select>
      </div>
    </div>
  );
};

export default ActionsBlock;
