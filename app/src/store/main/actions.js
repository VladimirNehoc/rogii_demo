const PAGE = 'MAIN';

const actions = {
  SET_ITEMS: `${PAGE}_SET_ITEMS`,
  SET_SORT: `${PAGE}_SET_SORT`,
  SET_PAGE: `${PAGE}_SET_PAGE`,
  SET_ITEMS_PER_PAGE: `${PAGE}_SET_ITEMS_PER_PAGE`,
  SET_COLUMNS_ORDER: `${PAGE}_SET_COLUMNS_ORDER`,

  setItems: (items) => ({
    type: actions.SET_ITEMS,
    payload: items,
  }),

  setSort: (field, direction) => ({
    type: actions.SET_SORT,
    payload: {
      field,
      direction,
    },
  }),

  setPage: (page) => ({
    type: actions.SET_PAGE,
    payload: page,
  }),

  setItemsPerPage: (itemsPerPage) => ({
    type: actions.SET_ITEMS_PER_PAGE,
    payload: itemsPerPage,
  }),

  setColumnsOrder: (columnsOrder) => ({
    type: actions.SET_COLUMNS_ORDER,
    payload: columnsOrder,
  }),
};

export default actions;
