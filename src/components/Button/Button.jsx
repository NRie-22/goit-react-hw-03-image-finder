import React from 'react';
import { BtnLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ loadMore }) => {
  return <BtnLoadMore onClick={loadMore}>Load more</BtnLoadMore>;
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
