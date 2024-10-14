import BookItem from "./BookItem";
import styled from "styled-components";

const BookListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 1rem;
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

const BookList = ({ category, books, onInsert }) => {
  return (
    <BookListBlock>
      {books.map((book, index) => (
        <BookItem
          book={book}
          key={book.doc.isbn13}
          onInsert={onInsert}
          index={index}
        />
      ))}
    </BookListBlock>
  );
};
export default BookList;
