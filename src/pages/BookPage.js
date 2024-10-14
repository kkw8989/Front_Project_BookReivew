import React, { useCallback, useState } from "react";
import Categories from "../components/Categories";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookData from "../components/BookData";
import ReviewForm from "../components/ReviewForm";

const BookPageBlock = styled.div`
  .search-container {
    display: flex;            
    flex-direction: column;   
    align-items: center;      
    max-width: 400px;       
  }

   .searchbar {
    font-family: "GmarketSansMedium";
    border: 2px solid #ffcc00; /* 테두리 색상 변경 */
    position: relative;
    max-width: 500px;
    margin: 50px auto;
    border-radius: 5px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 


    input {
      outline: none;
      border: none;
      display: block;
      width: 100%;
      padding: 15px 60px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 1.5rem;
      border-radius: 5px;
      transition: border-color 0.3s;
      

      &:focus {
        border-color: #22b8cf;
      }
    }

    button { // 초기화 버튼
      position: absolute;
      padding: 10px 15px;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      border: none;
      border-radius: 5px;
      background-color: #ffec8d;
      color: black; 
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;

      &:hover { 
        background-color: #dccb77;
      }
    }
  }

  .nosearchbar {
    display: none;
  }

  .agebar { // 아동 청소년 성인 bar
    font-family: "GmarketSansMedium";
    border: 2px solid #ffcc00; /* 노란색 테두리 */
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 460px;
    height: 57px;
    margin: 50px auto;
    display: flex;
    align-items: center;
    padding: 0 20px; 
    justify-content: space-between; 


    label {
      font-weight: bold;
      cursor: pointer;
      font-size: 1.35rem;
      color: #5d4037; /* 다크 브라운 색상 */
      display: flex;
      align-items: center;

      input {
        margin-right: 10px; /* 라벨과 라디오 버튼 간격 조정 */
      }
    }
  }

  .noagebar {
    display: none;
  }
`;

const BookPage = () => {
  const params = useParams();
  const category = params.category || "srchBooks";

  const [srchValue, setSrchValue] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const onChange = useCallback((e) => {
    setSrchValue(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    setSrchValue("");
  }, []);

  const onSubmit = useCallback(
    (e) => {
      setSrchValue(srchValue);
      e.preventDefault();
    },
    [srchValue]
  );

  const handleChange = useCallback(
    (e) => {
      setSelectedAge(e.target.value);
    },
    []
  );

  return (
    <>
      <Categories />
      <BookPageBlock>
        <form
          className={category === "srchBooks" ? "searchbar" : "nosearchbar"}
          onSubmit={onSubmit}
        >
          <input
            value={srchValue}
            placeholder="책 제목을 입력하세요."
            onChange={onChange}
          />
          <button type="submit" onClick={onClick}>
            초기화
          </button>
        </form>

        <form className={category === "loanItemSrch" ? "agebar" : "noagebar"}>
          <label>
            <input
              type="radio"
              name="age"
              value="0;6"
              checked={selectedAge === "0;6"}
              onChange={handleChange}
            />{" "}
            아동
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="8;14"
              checked={selectedAge === "8;14"}
              onChange={handleChange}
            />
            청소년
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="20;30;40;50;60"
              checked={selectedAge === "20;30;40;50;60"}
              onChange={handleChange}
            />{" "}
            성인
          </label>
        </form>

        <div className={category === "review" ? "reviewY" : "nosearchbar"}>
          <ReviewForm />
        </div>

        <div className={category === "review" ? "nosearchbar" : "reviewY"}>
          <BookData
            category={category}
            srchValue={srchValue}
            selectedAge={selectedAge}
          />
        </div>
      </BookPageBlock>
    </>
  );
};

export default BookPage;