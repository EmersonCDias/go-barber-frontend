import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background-color: #28262e;
    display: flex;
    align-items: center;
    width: 100%;

    div {
      width: 1220px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;

  img {
    margin-bottom: 25px;
    border-radius: 50%;
    width: 185px;
    height: 186px;
  }

  label {
    cursor: pointer;
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    bottom: 50px;
    right: 70px;
    border: none;
    background: #ff9000;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    svg {
      width: 20px;
      height: 20px;
      color: #000;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin: -100px auto 0;

  form {
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    input[name='old_password'] {
    }
  }

  > a {
    color: #ff9000;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;
