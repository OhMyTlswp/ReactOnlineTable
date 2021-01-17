import React from 'react';
import PropTypes from 'prop-types';
import { table } from './Table.module.scss';

export default function Table({ children }) {
  return <table className={table}>{children}</table>;
}
Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
