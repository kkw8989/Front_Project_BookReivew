import React, { useState } from 'react';
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  .ratingDisplay {
    margin-top: 5px; // 별점과 텍스트 간의 간격
    text-align: center; // 텍스트 가운데 정렬
  }
`;


const ReviewStar = ({ selectedRating, setSelectedRating }) => {
    const starsCount = 5;

    const updateStars = (rating) => {
        setSelectedRating(rating);
    };

    return (
        <RatingContainer>
            {Array.from({ length: starsCount }, (_, i) => (
                <span
                    key={i}
                    onClick={() => updateStars(i + 1)}
                    style={{
                        fontSize: '3rem',
                        cursor: 'pointer',
                        color: i < selectedRating ? 'gold' : 'lightgray',
                        marginRight: '5px', // 별 사이의 간격
                    }}
                >
                    ★
                </span>
            ))}
            <div className='ratingDisplay'>
                선택한 별점: {selectedRating}
            </div>
        </RatingContainer>
    );
};


export default ReviewStar;
