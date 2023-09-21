import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { handleOpen } from "../../components/Modals/EditModal/Modal";
import { getAllProducts } from "../../redux/actions";

const validationSchema = Yup.object({
  precioBase: Yup.number(),
  stateId: Yup.number(),
});

export default function EditForm({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser);
  const product = useSelector((state) => state.filteredProducts).find(
    (product) => product.id === id
  );
  const states = useSelector((state) => state.authUser.states);
  const isState = states.length > 0;
  const initialValues = {
    precioBase: product.precioBase,
    stateId: isState ? product.stateId : "",
  };

  const submitHandler = async ({ precioBase, stateId }) => {
    const info = stateId
      ? {
          precioBase,
          stateId,
        }
      : {
          precioBase,
        };
    const result = await axios.patch(`/product/${id}`, info);
    dispatch(getAllProducts(user.id));
    handleOpen();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { errors, touched, isSubmitting } = formik;
        return (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Price</Typography>
              <Field
                sx={{ marginBottom: "20px" }}
                placeholder="Price"
                name="precioBase"
                as={TextField}
                type="number"
                error={errors.email && touched.email}
                helpertext={errors.email && touched.email ? errors.email : null}
              />
              <Typography>State</Typography>
              {!isState ? (
                <Typography>No se encontraron estados!</Typography>
              ) : null}
              <Field
                placeholder="State"
                name="stateId"
                sx={{ marginBottom: "20px" }}
                disabled={!isState}
                as={Select}
                error={errors.password && touched.password}
                helpertext={
                  errors.password && touched.password ? errors.password : null
                }
              >
                {states.map((state) => {
                  return (
                    <MenuItem key={state.id} value={state.id}>
                      {state.name}
                    </MenuItem>
                  );
                })}
              </Field>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ marginBottom: "20px" }}
              >
                Confirm Changes
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
