import BasketItem from "./BasketItem";
import styled from "styled-components";

const BasketListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .nolist {
    display: none;
  }
`;

const BasketList = ({ category, baskets, onRemove, onBorrow, onToggle }) => {
  return (
    <BasketListBlock>
      {baskets.map((basket) => (
        <BasketItem
          basket={basket}
          key={basket.doc.isbn13}
          onRemove={onRemove}
          onBorrow={onBorrow}
          onToggle={onToggle}
        />
      ))}
    </BasketListBlock>
  );
};
export default BasketList;
