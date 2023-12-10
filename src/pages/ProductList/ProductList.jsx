import "./ProductList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../Redux/ProductSlice";
import CircularProgress from "@mui/material/CircularProgress";
import useUserRequests from "../../Utils/useUserRequests";

export default function ProductList() {
  const dispatch = useDispatch();
  const { userRequests } = useUserRequests();
  const { products, isLoading, fulfilled, error } = useSelector(
    (state) => state.Product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  function handleDeleteRow(productId) {
    dispatch(deleteProduct({ userRequests, productId }));
  }

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Product",
      width: 330,
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
    { field: "stock", headerName: "Stock", width: 100 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
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
        {isLoading ? (
          <div
            style={{
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <CircularProgress style={{ color: "darkblue" }} />
          </div>
        ) : (
          products && (
            <DataGrid
              disableRowSelectionOnClick
              rows={products}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          )
        )}

        {fulfilled && (
          <p style={{ color: "green", textAlign: "center", fontSize: "22px" }}>
            Product has been deleted successfully
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", fontSize: "22px" }}>
            Error try again later...
          </p>
        )}
      </div>
    </div>
  );
}
