import React, { useCallback, useState } from "react";
import styled from "styled-components";
import BookList from "./BookList";
import BasketList from "./BasketList";

const BookSearchBlock = styled.div`
  .noshow {
    display: none;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px; /
  }
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  color: black; /* 텍스트 색상 */
  background: #ffec8d; /* 노란색 배경 */
  border: none;
  border-radius: 5px;
  border: 2px solid #ffcc00
  cursor: pointer;
  transition: background 0.3s;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #dccb77; /* 호버 시 어두운 노란색 */
  }
`;

const BookSetting = ({ category, books }) => {
  const [baskets, setBaskets] = useState([]);

  const onInsert = useCallback((isbn13) => {
      const addBaskets = books.filter((book) => book.doc.isbn13 === isbn13);
      setBaskets((baskets) => baskets.concat(addBaskets));
      alert("해당 도서가 북카트에 추가되었습니다.");
    },
    [books]
  );

  const onRemove = useCallback((isbn13) => {
    setBaskets((baskets) =>
      baskets.filter((basket) => basket.doc.isbn13 !== isbn13)
    );
    alert("해당 도서의 삭제가 완료되었습니다.");
  }, []);

  const onBorrow = useCallback((isbn13) => {
    setBaskets((baskets) =>
      baskets.filter((basket) => basket.doc.isbn13 !== isbn13)
    );
    alert("해당 도서의 대출신청이 완료되었습니다.");
  }, []);

  const onToggle = useCallback(
    (isbn13) => {
      setBaskets(
        baskets.map((basket) =>
          basket.doc.isbn13 === isbn13
            ? { doc: { ...basket.doc, checked: !basket.doc.checked } }
            : basket
        )
      );
    },
    [baskets]
  );

  const onRemoveAll = useCallback(() => {
    const checkedBaskets = baskets.filter((basket) => basket.doc.checked);
    setBaskets((baskets) => baskets.filter((basket) => !basket.doc.checked));
    alert(`${checkedBaskets.length}개의 도서가 삭제되었습니다.`);
  }, [baskets]);

  const onBorrowAll = useCallback(() => {
    const checkedBaskets = baskets.filter((basket) => basket.doc.checked);
    setBaskets((baskets) =>
      baskets.filter((basket) => !basket.doc.checked)
    );
    alert(`${checkedBaskets.length}개의 도서의 대출신청이 완료되었습니다.`);
  }, [baskets]);

  return (
    <BookSearchBlock>
      <div className={category !== "bookBskt" ? "show" : "noshow"}>
        <BookList category={category} books={books} onInsert={onInsert} />
      </div>
      <div className={category === "bookBskt" ? "show" : "noshow"}>
        <div className="button-container">
          <StyledButton onClick={onBorrowAll}>선택 대출신청</StyledButton>
          <StyledButton onClick={onRemoveAll}>선택 삭제</StyledButton>
        </div>
        <BasketList
          category={category}
          baskets={baskets}
          onRemove={onRemove}
          onBorrow={onBorrow}
          onToggle={onToggle}
          onBorrowAll={onBorrowAll}
          onRemoveAll={onRemoveAll}
        />
      </div>
    </BookSearchBlock>
  );
};

export default BookSetting;
