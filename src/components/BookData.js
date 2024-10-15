import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import BookSetting from "./BookSetting";

const BookDataBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  @media screen and (max-width: 768px) { // 768픽셀 이하일 때(필요없어보임)
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8); // 로딩중일 때 화면 반투명
  
`;

const BookData = ({ category, srchValue, selectedAge }) => {
  const [books, setBooks] = useState("");
  const [loading, setLoading] = useState(false);
  const array = [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (category === "loanItemSrch") {
          const response = await axios.get(
            // `http://data4library.kr/api/${category}?authKey=[key]&age=${selectedAge}&pageNo=1&pageSize=10&format=json`
          );

          for (let i = 0; i <= 9; i++) {
            array.push({
              doc: {
                ...response.data.response.docs[i].doc,
                checked: false,
              },
            });
          }
          setBooks(array);
        }        
                
        if (category === "srchBooks") {
          const response = await axios.get(
            // `http://data4library.kr/api/${category}?authKey=[key]&title=${srchValue}&exactMatch=true&pageNo=1&pageSize=10&format=json`
          );
          for (let i = 0; i <= 9; i++) {
            array.push({
              doc: {
                ...response.data.response.docs[i].doc,
                checked: false,
              },
            });
          }
          setBooks(array);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [srchValue, category, selectedAge]);

  return (
    <BookDataBlock>
      {loading && (
        <LoadingOverlay></LoadingOverlay>
      )}
      {books && <BookSetting category={category} books={books} />}
    </BookDataBlock>
  );
};

export default BookData;
