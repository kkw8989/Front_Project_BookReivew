import styled from "styled-components";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "srchBooks",
    text: "도서검색",
  },
  {
    name: "loanItemSrch",
    text: "인기도서",
  },
  {
    name: "bookBskt",
    text: "북카트",
  },
  {
    name: "review",
    text: "리뷰",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
  background: #fff8e1; /* 연한 노란색 배경 */
  border: 2px solid #ffcc00; /* 노란색 테두리 */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Category = styled(NavLink)`
  flex: 1;
  font-size: 1.125rem;
  cursor: pointer;
  text-decoration: none; 
  color: #5d4037; /* 다크 브라운 색상 */
  padding: 10px;
  text-align: center;
  border-right: 1px solid #ffcc00; /* 노란색 오른쪽 테두리 */
  transition: background-color 0.3s, color 0.3s; 

  &:hover {
    background-color: #ffecb3; /* 호버 시 연한 노란색 배경 */
    color: #ff9800; /* 호버 시 텍스트 색상 변경 */
  }

  &.active {
    font-weight: 600;
    background-color: #ffcc00; /* 활성화된 항목 배경색 */
    color: white; 
    &:hover {
      background-color: #ffd54f; /* 호버 시 색상 */
    }
  }

  &:last-child {
    border-right: none; 
  }
`;

const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={c.name === "srchBooks" ? "/srchBooks" : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;