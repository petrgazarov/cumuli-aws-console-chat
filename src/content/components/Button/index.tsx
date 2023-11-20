import styled from "styled-components";

const StyledButton = styled.button`
  padding: 4px 20px;
  color: #d5dbdb;
  font-weight: 700;
  border: 1px solid #879596;
  border-radius: 2px;
  line-height: 22px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #21252c;
    border: 1px solid #aab7b8;
    color: #fafafa;
  }
`;

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ onClick, children }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
