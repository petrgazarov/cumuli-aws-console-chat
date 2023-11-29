import styled from "styled-components";

export const ConfigTabContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const SubmitApiKeyButtonContainer = styled.div`
  margin-left: 8px;
`;

export const TextInputRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const ClearDataButtonLabel = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.HELP_TEXT};
`;

export const ClearDataRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`;
