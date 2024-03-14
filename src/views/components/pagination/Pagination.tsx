import React from 'react';
import { Pagination, PaginationProps } from 'semantic-ui-react';

interface IProps {
  activePage: number;
  totalPages: number;
  onPageChange: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => void;
}

const Paging: React.FC<IProps> = ({ activePage = 1, totalPages = 0, onPageChange }) => (
  <Pagination defaultActivePage={1} activePage={activePage} totalPages={totalPages} onPageChange={(e, data) => onPageChange(e, data)} />
);

export default Paging;
