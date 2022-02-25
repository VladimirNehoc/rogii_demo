import React, { useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import mainActions from 'store/main/actions';

import SortStatus from 'components/SortChanger';

const {
  setSort,
  setColumnsOrder,
} = mainActions;

const Table = () => {
  const dispatch = useDispatch();

  const {
    items,
    columnsOrder,
    sort,
    page,
    itemsPerPage,
  } = useSelector((state) => state.main);

  const { field, direction } = sort;

  const tableRef = useRef(null);

  // Привязка ивентов для перемещения столбцов
  useEffect(() => {
    if (!_.isEmpty(columnsOrder) && tableRef.current) {
      const ceils = tableRef.current.querySelectorAll('th');

      let dragStartColumn;
      let dragEndRelativeFromCenter;

      const handleDragStart = (e) => {
        e.target.style.opacity = 0.4;

        dragStartColumn = e.target;
      };

      const handleDragEnter = (e) => {
        e.target.classList.add('over');
      };

      const handleDragLeave = (e) => {
        e.target.classList.remove('over', 'over-right', 'over-left');
      };

      const handleDragOver = (e) => {
        e.preventDefault();

        const currentX = e.x;

        const currentScrollLeft = e.target.closest('.table-container')?.scrollLeft;
        const elementWidth = e.target.clientWidth;

        const relativeFromCenter = (currentX - e.target.offsetLeft)
          - (elementWidth / 2)
          + currentScrollLeft;

        if (relativeFromCenter <= 0 && !e.target.classList.contains('over-left')) {
          e.target.classList.add('over-left');
          e.target.classList.remove('over-right');
          dragEndRelativeFromCenter = 'left';
        } else if (relativeFromCenter > 0 && !e.target.classList.contains('over-right')) {
          e.target.classList.add('over-right');
          e.target.classList.remove('over-left');
          dragEndRelativeFromCenter = 'right';
        }
      };

      const handleDragDrop = (e) => {
        if (e.target.closest('.main-table') && e.target.tagName === 'TH') {
          let newColumnsOrder = [...columnsOrder];

          const indexStart = dragStartColumn.cellIndex;
          const indexEnd = dragEndRelativeFromCenter === 'left'
            ? e.target.cellIndex
            : e.target.cellIndex + 1;

          if (indexStart === indexEnd) return null;

          newColumnsOrder[indexStart] = null;

          newColumnsOrder = [
            ..._.slice(newColumnsOrder, 0, indexEnd),
            columnsOrder[indexStart],
            ..._.slice(newColumnsOrder, indexEnd, newColumnsOrder.length),
          ];

          dispatch(setColumnsOrder(_.compact(newColumnsOrder)));
        }

        return null;
      };

      const handleDragEnd = (e) => {
        e.target.style.opacity = 1;

        ceils.forEach((item) => {
          item.classList.remove('over', 'over-right', 'over-left');
        });
      };

      ceils.forEach((ceil) => {
        ceil.addEventListener('dragstart', handleDragStart);
        ceil.addEventListener('dragend', handleDragEnd);
        ceil.addEventListener('dragenter', handleDragEnter);
        ceil.addEventListener('dragleave', handleDragLeave);
        ceil.addEventListener('drop', handleDragDrop);
        ceil.addEventListener('dragover', handleDragOver);
      });

      return () => {
        ceils.forEach((ceil) => {
          ceil.removeEventListener('dragstart', handleDragStart);
          ceil.removeEventListener('dragend', handleDragEnd);
          ceil.removeEventListener('dragenter', handleDragEnter);
          ceil.removeEventListener('dragleave', handleDragLeave);
          ceil.removeEventListener('drop', handleDragDrop);
          ceil.removeEventListener('dragover', handleDragOver);
        });
      };
    }

    return null;
  }, [columnsOrder, tableRef.current]);

  const onClickSort = (columnName) => {
    if (field === columnName) {
      switch (direction) {
        case 'asc':
          dispatch(setSort(columnName, 'desc'));
          break;
        case 'desc':
          dispatch(setSort(columnName, null));
          break;
        default:
          dispatch(setSort(columnName, 'asc'));
      }
    } else {
      dispatch(setSort(columnName, 'asc'));
    }
  };

  const sortedItems = useMemo(
    () => {
      if (field && direction) {
        const sortedResult = [...items];

        sortedResult.sort((a, b) => {
          if (a[field] > b[field]) {
            return direction === 'asc' ? 1 : -1;
          }
          if (a[field] < b[field]) {
            return direction === 'asc' ? -1 : 1;
          }

          return 0;
        });

        return sortedResult;
      }

      return items;
    },
    [items, sort, columnsOrder],
  );

  const paginatedItems = useMemo(
    () => {
      const offset = (page - 1) * itemsPerPage;

      return _.slice(sortedItems, offset, offset + itemsPerPage);
    },
    [sortedItems, itemsPerPage, page, columnsOrder],
  );

  return (
    <div className="table-container">
      <table className="main-table" ref={tableRef}>
        <thead>
          <tr>
            {
              _.map(columnsOrder, (column) => {
                const currentSort = field === column ? direction : null;

                return (
                  <th
                    key={column}
                    id={column}
                    onClick={() => onClickSort(column)}
                    draggable
                  >
                    <span>
                      {column}
                      <SortStatus status={currentSort} />
                    </span>
                  </th>
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {_.map(paginatedItems, (item) => (
            <tr key={item.revision}>
              {
                _.map(columnsOrder, (column) => (
                  <td key={column}>
                    <span>{item[column]}</span>
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
