import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // 수평 가운데 정렬
    justify-content: flex-start; // 수직 가운데 정렬
    padding: 20px;
    box-sizing: border-box; // padding 포함
    font-family: Arial, sans-serif; // 폰트 설정
    font-size: 20px;
    font-weight: 400; // Bold
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; // 부모 요소의 너비에 맞춤
    margin-bottom: 20px; // 리뷰 리스트와의 간격
`;

const Textarea = styled.textarea` // 리뷰 작성 칸
    font-size: 30px;
    width: 95%; // 원하는 너비 설정
    margin-bottom: 20px;
    margin-left: 20px; // 양 옆 조절
    text-align: center; //flex-end
    border: 2px solid #ffcc00;
    border-radius: 5px; 
    resize: none;
    height: 77px;
    line-height: 77px;
    overflow-y: hidden;
    background-color: #fcf9ec; // 배경색 추가
    outline: none; // 포커스 시 외곽선 제거
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    font-size: 20px;
    padding: 15px 20px;
    margin: 0 330px; // 버튼 위치 조절
    background-color: #ffec8d; // 버튼 색상
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border: 2px solid #ffcc00;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap; 

    &:hover {
        background-color: #fae26a; // 버튼 호버 색상
    }
`;

const ReviewList = styled.div`
    width: 100%; // 리뷰 리스트 너비 설정
    display: flex;
    flex-direction: column; // 세로 방향으로 나열
    align-items: center; // 가운데 정렬
    overflow-y: auto; // 필요 시 스크롤 추가
    
`;

const ReviewItem = styled.div`
  white-space: normal;
  // 각 리뷰 창
  display: flex;
  flex-direction: column;
  width: 93%;
  margin: 10px 0;
  padding: 10px;
  border: 2px solid #ffcc00;
  border-radius: 5px; // 모서리 둥글게
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // 그림자 추가
  background-color: #fffef5;
  img {
    display: block;
    width: 120px;
    height: 170px;
    object-fit: cover;
    border: 2px solid #e2e2c9;
    border-radius: 5px; /* 모서리 둥글게 */
  }
`;


const ReviewContent = styled.div`
    display: flex;
    align-items: flex-start; 
    width:100%;
    overflow:hidden;
    
    .thumbnail {
        margin-right: 20px; // 썸네일과 텍스트 간의 간격

        img {
            width: 80px; // 썸네일 너비
            height: 120px; // 썸네일 높이
            object-fit: cover; // 비율 유지하며 잘리게
        }
    }
`;

const ReviewText = styled.div`
    text-align: center;
    flex-grow: 1; // 리뷰 내용이 가능한 공간을 차지하도록 설정
    white-space: normal; // 줄바꿈 허용
    overflow-wrap: break-word; // 단어가 넘어가면 줄바꿈
    overflow: hidden;
    margin-top: 10px;

    .reviewtitle{
    margin-bottom: 10px;
    }

    
`;

const DeleteButton = styled.span` 
    color: #f64e4e;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    align-items: flex-end;
`;

const EditButton = styled.button`
    font-weight: bold;
    font-size: 20px;
    color: blue;
    margin-top: 10px;

    padding: 0 15px;
    border: none;
    border-radius: 5px;
    background-color: #fffef5;
    cursor: pointer;
    white-space: nowrap;
;
`;

const Review = () => {
    const location = useLocation();
    const book = location.state?.book || {};
    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reviewInput.trim()) {
            if (editIndex !== null) {
                const updatedReviews = [...reviews];
                updatedReviews[editIndex] = { text: reviewInput, book };
                setReviews(updatedReviews);
                setEditIndex(null);
            } else {
                setReviews([...reviews, { text: reviewInput, book }]);
            }
            setReviewInput('');
        } else {
            alert('리뷰를 입력하세요!');
        }
    };

    const handleDelete = (index) => {
        const newReviews = reviews.filter((_, i) => i !== index); 
        // _: 사용하지 않음, i : 현재 요소
        setReviews(newReviews);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setReviewInput(reviews[index].text); // 리뷰 내용을 입력란에 설정
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 엔터 키의 기본 동작 방지 (줄바꿈 방지)
            handleSubmit(e);
        }
    };

    return (
        <Container>
            <h3>리뷰 작성</h3>
            {book.image && <img src={book.image} alt={book.title} style={{ width: '120px', height: '170px', marginBottom: '20px' }} />}
            {book.title && <h4>{book.title}</h4>}
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <Textarea
                    value={reviewInput}
                    onChange={(e) => {
                        setReviewInput(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
                    placeholder="리뷰를 입력하세요"
                />
                <Button type="submit">{editIndex !== null ? '수정' : '제출'}</Button>
              </form>
            </FormContainer>

            <ReviewList>
                {reviews.map((review, index) => (
                    <ReviewItem key={index}>
                        <ReviewContent>
                            <div className="thumbnail">
                                {review.book?.image && (
                                    <img src={review.book.image} alt={book.title} />
                                )}
                            </div>
                            <ReviewText>
                            <div className="reviewtitle"><strong>{review.book?.title}</strong></div> {/* 책 제목 추가 */}
                            <div>  {review.text}</div>
                            </ReviewText>
                            <EditButton onClick={() => handleEdit(index)}>수정</EditButton>
                            <DeleteButton onClick={() => handleDelete(index)}>삭제</DeleteButton>
                        </ReviewContent>
                    </ReviewItem>
                ))}
            </ReviewList>
        </Container>
    );
};

export default Review;