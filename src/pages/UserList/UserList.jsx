import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { userRows } from "../../dummyData";
import { useState } from "react";
export default function UserList() {
  const [dataGridRows, setDataGridRows] = useState(userRows);
  function handleDeleteRow(rowID) {
    console.log(rowID);
    const newData = dataGridRows.filter((row) => row.id !== rowID);
    setDataGridRows(newData);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userlist-user-container">
            <img
              src={params.row.avatar}
              alt="user image"
              className="userlist-img"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },

    {
      field: "transaction",
      headerName: "Transaction",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id} className="userList-edit">
              Edit
            </Link>
            <DeleteOutlineIcon
              className="userList-delete"
              onClick={() => handleDeleteRow(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
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
