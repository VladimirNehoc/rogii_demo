import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from './pages/Main';

import mainActions from './store/main/actions';

import testData from './data.json';
import './style.less';

const { setItems } = mainActions;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setItems(testData.content));
  }, []);

  return (
    <div className="app">
      <Main />
    </div>
  );
};

export default App;
