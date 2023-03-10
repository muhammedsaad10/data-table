import React, { useState } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./tabel.css";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import useFetch from "../../../hooks/useFetch";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Trash from "../../../assets/icons/trash.svg";
import DialogTitle from "@mui/material/DialogTitle";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Tabledata({ toggle }) {
  console.log(toggle, "chekcing is true or not");
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = useState(1);

  const [deleteId, setDeleteId] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data, pages, fetchData } = useFetch(
    `http://localhost:8800/item?page=${page}`
  );
  console.log("pages", pages);
  console.log("data to be mapped:", data);

  const drop = () => {
    deleteId &&
      axios
        .delete(`http://localhost:8800/item/${deleteId}`)
        .then(() => fetchData());
  };

  const edit = (id) => {
    console.log("editing id is:", id);
    axios
      .get(`http://localhost:8800/item/find/${id}`)
      .then((response) => {
        console.log("the response for your api call is ", response);
      })
      .catch((err) => {
        const errmsg = err.toString();
        console.log("error is ", errmsg);
      });
  };
  const handleChange = (event, value) => {
    console.log("vaaaaal", value);
    setPage(value);
    console.log("value of the page", value);
    fetchData();
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton aria-label="delete" size="large">
            <img src={Trash} />
          </IconButton>
          <DialogTitle id="alert-dialog-title">{"Are you Sure"}</DialogTitle>

          <DialogContent>
            {"Do you Really Want to Delete this record?"}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => {
                drop();
                handleClose();
              }}
              autoFocus
            >
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <header className="header"></header>

      <div
        className="mainDivTable"
        // style={{ marginLeft: toggle ? "27%" : "10px" }}
      >
        <div className="tableHeader">
          <div className="tableTitle">
            <h6>OVERVIEW</h6>
          </div>
          <div>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="addItemBtn">Add Item</button>
            </Link>
          </div>
        </div>
        <div className="tbl">
          <Table id="tableTD">
            <Thead>
              <Tr className="tableThRow">
                <Th className="tableTh">Items</Th>
                <Th className="tableTh">weight</Th>
                <Th className="tableTh">Mrp</Th>
                <Th className="tableTh">Distributer-price</Th>
                <Th className="tableTh">Dp</Th>
                <Th className="tableTh">productCost</Th>
                <Th className="tableTh">Tax-percent</Th>
                <Th className="tableTh">PackageCost</Th>
                <Th className="tableTh">Packing Tax</Th>
                <Th className="tableTax">Tax value</Th>
                <Th className="tableTh">IncTax</Th>
                <Th className="tableTh">GrossProfit</Th>
                <Th className="tableTh">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => {
                return (
                  <Tr>
                    <Td>
                      <span>{item?.item}</span>
                    </Td>
                    <Td>
                      <span>{item?.kilogram}</span>
                    </Td>
                    <Td>
                      <span>{item?.mrp}</span>
                    </Td>
                    <Td>
                      <span>{item?.distributerPrice}</span>{" "}
                    </Td>
                    <Td>
                      <span>{item?.dp}</span>{" "}
                    </Td>
                    <Td>
                      <span>{item?.costOfProduct}</span>
                    </Td>
                    <Td>
                      <span>{item?.percentage}%</span>
                    </Td>
                    <Td>
                      <span>{item?.packingCost}</span>
                    </Td>
                    <Td>
                      <span>{item?.packingGst}%</span>
                    </Td>

                    <Td className="tableTax">
                      <span>{item?.tax}</span>{" "}
                    </Td>
                    <Td>
                      <span>{item?.incTaxCost}</span>
                    </Td>
                    <Td>
                      <span>{item?.grossProfit}</span>
                    </Td>
                    <Td>
                      <div className="btn">
                        <Link
                          to={`/?itemId=${item._id}`}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            marginRight: "6px",
                          }}
                        >
                          <FaEdit
                            className="edit"
                            onClick={() => {
                              edit(item?._id);
                            }}
                          />
                        </Link>
                        <FaTrash
                          className="trash"
                          onClick={() => {
                            setDeleteId(item?._id);
                            // drop(item?._id);
                            console.log("idddddd", item._id);
                            handleClickOpen();
                          }}
                        />
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
        {/* <div className="bt">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Button variant="contained">Homepage</Button>{" "}
          </Link>
        </div> */}
        <div className="pagenation">
          <Stack spacing={2}>
            <Pagination
              count={pages}
              shape="rounded"
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
