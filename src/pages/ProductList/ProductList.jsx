import "./ProductList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { productRows } from "../../dummyData";
import { useState } from "react";

export default function ProductList() {
  const [dataGridRows, setDataGridRows] = useState(productRows);

  function handleDeleteRow(rowID) {
    console.log(rowID);
    const newData = dataGridRows.filter((row) => row.id !== rowID);
    setDataGridRows(newData);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Product",
      width: 260,
      renderCell: (params) => {
        return (
          <div className="productList-product-container">
            <img
              src={params.row.img}
              alt="user image"
              className="productList-img"
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },

    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id} className="productList-edit">
              Edit
            </Link>
            <DeleteOutlineIcon
              className="productList-delete"
              onClick={() => handleDeleteRow(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          disableRowSelectionOnClick
          rows={dataGridRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
