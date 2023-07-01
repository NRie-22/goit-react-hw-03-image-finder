import styled from '@emotion/styled';

export const BtnLoadMore = styled.button`
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 400;
  padding-left: 25px;
  padding-right: 25px;
  color: #fff;
  display: block;
  margin: 25px auto;
  clip-path: polygon(
    0 0,
    0 0,
    100% 0,
    100% 0,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    15px 100%,
    0 100%
  );
  height: 40px;
  font-size: 0.7rem;
  line-height: 14px;
  letter-spacing: 1.2px;
  transition: 0.2s 0.1s;
  background: linear-gradient(90deg, #8b0000, #ffff00);
  border: 0 solid;
  overflow: hidden;

  :hover,
  :focus {
    cursor: pointer;
    transition: all 0.3s ease-in;
    padding-right: 30px;
    padding-left: 30px;
  }
`;
