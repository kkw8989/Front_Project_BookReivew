import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BookItemBlock = styled.div`
  display: flex;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); /* 그림자 추가 */
  transition: transform 0.2s, background-color 0.3s; /* 배경색 변화 애니메이션 추가 */

  &:hover {
    transform: translateY(-5px);
  }

  &:nth-child(even) {
    background: #f5f3e7; /* 짝수 번째 항목 배경색 */
  }

  .thumbnail {
    margin: 30px 20px;
    img {
      display: block;
      width: 120px;
      height: 170px;
      object-fit: cover;
      border: 2px solid #e2e2c9; // black
      border-radius: 8px; /* 이미지 둥글게 */
    }
  }

  .index {
    margin: 60px 15px;
    display: block;
    width: 50px;
    p {
      font-size: 35px;
      text-align: end;
      color: black;
    }
  }

  .contents {
    flex-grow: 1;
    h2 {
      margin: 30px 5px;
      font-size: 1.5rem;
      color: black;
      a {
        color: inherit;
        text-decoration: none;
        &:hover {
          text-decoration: underline; /* 호버 시 밑줄 */
        }
      }
    }

    p {
      margin: 0 10px;
      line-height: 1.5;
      margin-top: 0.5rem;
      color: #495057;
    }

    button { // 북카트에 담기 버튼
      display: block;
      margin-right:0px;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;

      background-color: #ffec8d;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #dccb77; /* 호버 시 어두운 노란색 */
    }
}

     .button-container {
      display: flex;
      gap: 10px; /* 버튼 간의 간격 */
      margin-right:30px;
      }
    }

  & + & {
    border-top: 1px solid #ffeeba; /* 항목 사이 구분선 */
  }
`;


const BookItem = ({ book, index, onInsert }) => {
  const {
    bookname,
    authors,
    bookDtlUrl,
    bookImageURL,
    publisher,
    isbn13,
    publication_year,
  } = book.doc;
  
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate("/review", {
      state: {
        book: {
          title: bookname,
          authors: authors,
          publisher: publisher,
          image: bookImageURL,
        },
      },
    });
  };

  return (
    <BookItemBlock>
      <div className="index">
        <p>{index + 1}</p>
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
        <button onClick={() => onInsert(isbn13)}>북카트에 담기</button>
        <button onClick={handleReviewClick}>리뷰쓰기</button>
        </div>
      </div>
    </BookItemBlock>
  );
};

export default BookItem;
