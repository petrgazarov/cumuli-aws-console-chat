import styled from "styled-components";

import { BORDER_RADIUS } from "sidePanel/utils/globalStyles";
import { COLORS } from "sidePanel/utils/globalStyles";
import { Theme } from "sidePanel/utils/types";

export const Container = styled.div`
  flex-grow: 1;
`;

export const StyledTextInput = styled.input<{ theme: Theme }>`
  height: 32px;
  background-color: ${COLORS.BLACK_5};
  border-radius: ${BORDER_RADIUS};
  box-sizing: border-box;
  margin-top: 1px;
  outline: 2px dotted transparent;
  border: 1px solid ${COLORS.BLUE_3};
  color: ${COLORS.BLUE_1};
  line-height: 22px;
  max-width: 100%;
  resize: none;
  font-family: Monaco, monospace;
  font-size: 13px;
  padding: 4px 8px;

  &::placeholder {
    color: ${COLORS.GRAY_1};
    font-style: italic;
  }

  &:focus {
    border: 1px solid ${COLORS.BLUE_5};
    box-shadow: 0 0 0 1px ${COLORS.BLUE_5};
  }
`;

export const Label = styled.div`
  color: ${COLORS.BLUE_1};
  margin-bottom: 4px;
`;

export const TextInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SavedStatus = styled.div`
  position: absolute;
  right: 10px;
  top: 18%;
  color: ${COLORS.GREEN};
  font-weight: 600;
  font-size: 13px;
`;
