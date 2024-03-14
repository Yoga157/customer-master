import './PaginationStyle.scss';
import React from 'react';
import { Pagination } from 'semantic-ui-react';

interface IProps {
  activePage: number;
  totalPage: number;
  pageSize: number;
  onPageChange: (e: any, data: any) => void;
}
const pagination: React.FC<IProps> = ({ activePage, onPageChange, totalPage, pageSize }) => {
  return <Pagination activePage={activePage} onPageChange={(e, data) => onPageChange(e, data)} totalPages={Math.ceil(totalPage / pageSize)} />;
};

export default pagination;
