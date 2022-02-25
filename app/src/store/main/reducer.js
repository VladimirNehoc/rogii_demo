import _ from 'lodash';

import actions from './actions';

export const itemsPerPageList = [5, 10, 25, 50];
export const sortingList = ['asc', 'desc'];

export const initialState = {
  items: [],
  columnsOrder: [],
  itemsPerPage: itemsPerPageList[1],
  page: 1,
  sort: {
    field: null,
    direction: sortingList[1],
  },
};

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case actions.SET_ITEMS: {
      const columnsOrder = payload[0] ? _.keys(payload[0], (key) => key) : [];

      return {
        ...state,
        items: payload,
        columnsOrder,
      };
    }
    case actions.SET_SORT: {
      return {
        ...state,
        sort: {
          field: payload.field,
          direction: payload.direction,
        },
      };
    }
    case actions.SET_PAGE: {
      return {
        ...state,
        page: payload,
      };
    }
    case actions.SET_ITEMS_PER_PAGE: {
      return {
        ...state,
        itemsPerPage: payload,
        page: 1,
      };
    }
    case actions.SET_COLUMNS_ORDER: {
      return {
        ...state,
        columnsOrder: payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
