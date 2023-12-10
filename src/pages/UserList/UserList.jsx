import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserRequests from "../../Utils/useUserRequests";
import { deleteUser, getUsers } from "../../Redux/UserSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserList() {
  const dispatch = useDispatch();
  const { userRequests } = useUserRequests();
  const { Users, isLoading, error } = useSelector((state) => state.User);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function handleDeleteRow(userID) {
    dispatch(deleteUser({ userRequests, userID }))
      .then(() => {
        // Show success message
        setShowSuccessMessage(true);

        // Reset success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error deleting user:", error);
      });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    dispatch(getUsers(userRequests));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 220,
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
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/*  <Link to={"/user/" + params.row.id} className="userList-edit">
              View
            </Link> */}
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          margin: "10px",
        }}
      >
        <Link
          to="/new-user"
          className="user-add-btn"
          style={{ width: "130px" }}
        >
          Create New User
        </Link>
      </div>
      {showSuccessMessage && (
        <p style={{ color: "green", textAlign: "center", fontSize: "22px" }}>
          User has been deleted successfully
        </p>
      )}
      {error && (
        <p style={{ color: "red", textAlign: "center", fontSize: "22px" }}>
          Error try again later...
        </p>
      )}
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
        Users && (
          <div style={{ height: "90%", width: "100%", marginTop: "20px" }}>
            <DataGrid
              disableRowSelectionOnClick
              rows={Users}
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
        )
      )}
    </div>
  );
}
