import styled from "styled-components";

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

export const CloseIcon = styled.i`
  position: absolute;
  color: #9ba6b2;
  font-size: 24px;
  right: 0;
  top: 0;
  padding: 10px;
  &:hover {
    color: #20233f;
  }
`;