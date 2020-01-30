import React from "react";
import Button from "@material-ui/core/Button";
import {Dialog, Checkbox, TextField} from "@material-ui/core";
import styled from "styled-components";


const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;


const DraggableDialog = (props: any) => {

  return (
    <Dialog
      open={props.open}
    >
      <Form noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="outlined" />
        <Checkbox
            defaultChecked
            color="default"
            value="default"
        />
      </Form>
      <i className="fas fa-times" onClick={props.close} />
    </Dialog>
  );
};

export default DraggableDialog;
