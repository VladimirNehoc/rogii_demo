import React from 'react';
import cn from 'classnames';

import './style.less';

const SortStatus = ({
  status,
}) => {
  const mainClasses = cn({ active: !!status });
  const upClasses = cn({ active: status === 'asc' });
  const downClasses = cn({ active: status === 'desc' });

  return (
    <div className={`sort-changer ${mainClasses}`}>
      <div className={`sort-changer_up ${upClasses}`}>
        <span>&#9650;</span>
      </div>
      <div className={`sort-changer_down ${downClasses}`}>
        <span>&#9650;</span>
      </div>
    </div>
  );
};

export default SortStatus;
