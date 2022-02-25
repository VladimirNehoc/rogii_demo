import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import Loader from 'components/Loader';

import Table from './Table';
import ActionsBlock from './ActionsBlock';

import './style.less';

const Main = () => {
  const {
    items,
  } = useSelector((state) => state.main);

  if (_.isEmpty(items)) {
    return <Loader />;
  }

  return (
    <div className="page-main">
      <ActionsBlock />

      <Table />
    </div>
  );
};

export default Main;
