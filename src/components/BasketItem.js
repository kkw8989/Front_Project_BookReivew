import styled from "styled-components";
import cn from "classnames";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BasketItemBlock = styled.div`
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); /* 그림자 추가 */
    transition: transform 0.2s, background-color 0.3s; /* 배경색 변화 애니메이션 추가 */

    &:hover {
    transform: translateY(-5px);
    background-color: #ffecb3; /* 호버 시 배경색 변경 */
  }

  .checkbox {
    display: flex;
    padding: 1.25rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); /* 그림자 추가 */
    border-radius: 8px; /* 모서리 둥글게 */
    
    .chad {
      margin-right: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        font-size: 1.5rem;
        transition: color 0.3s;
      }
    }

    .thumbnail {
      margin: 5px 10px;
      img {
        display: block;
        width: 120px;
        height: 170px;
        object-fit: cover;
        border: 2px solid #e2e2c9;
        border-radius: 5px; /* 모서리 둥글게 */
      }
    }

    .contents {
    flex-grow: 1;
      h2 {
        margin: 5px 15px;
        font-size: 1.5rem;
        color: black;
        a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      p {
      margin: 0 20px;
      line-height: 1.5;
      margin-top: 1rem;
      color: #495057;
    }

    button {
      display: block;
      padding: 10px 15px;
      border:none;
      white-space: normal;
      color: black;
      background: #ffec8d;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;

       &:hover {
        background: #dccb77;
        }
}

      .button-container {
      display: flex;
      gap: 10px; /* 버튼 간의 간격 */
      }
    }

    &.checked {
      background: #ffe0a1;
      svg { // MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank는 react-icons 라이브러리에서 제공하는 아이콘 컴포넌트, 체크박스 색깔
        color: black
      }
    }

    & + & {
      border-top: 1px solid #dee2e6;
    }
  }
`;

const BasketItem = ({ basket, onRemove, onBorrow, onToggle }) => {
  const {
    bookname,
    authors,
    bookDtlUrl,
    bookImageURL,
    publisher,
    isbn13,
    publication_year,
    checked,
  } = basket.doc;

  const navigate = useNavigate();
  
  
  return (
    <BasketItemBlock>
      <div className={cn("checkbox", { checked })}>
        <div className="chad" onClick={() => onToggle(isbn13)}>
          {checked ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
        </div>
        {bookImageURL && (
          <div className="thumbnail">
            <a href={bookDtlUrl} target="_blank" rel="noopener noreferrer">
              <img src={bookImageURL} alt="thumbnail" />
            </a>
          </div>
        )}
        <div className="contents">
          <h2>
            <a href={bookDtlUrl} target="_blank" rel="noopener noreferrer">
              {bookname}
            </a>
          </h2>
          <p>{authors}</p>
          <p>
            출판: {publisher}, {publication_year}
          </p>
          <p>ISBN: {isbn13}</p>
          <div className="button-container">
          <button onClick={() => onBorrow(isbn13)}>대출신청</button>
          <button onClick={() => onRemove(isbn13)}>삭제</button>
        </div>
      </div>
      </div>
    </BasketItemBlock>
  );
};

export default BasketItem;