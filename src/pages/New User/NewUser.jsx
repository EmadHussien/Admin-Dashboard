import "./NewUser.css";

export default function NewUser() {
  return (
    <div className="new-user">
      <h1 className="new-user-title">New User</h1>
      <form className="new-user-Form">
        <div className="new-user-item">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div>
        <div className="new-user-item">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="new-user-item">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className="new-user-item">
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="new-user-item">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="new-user-item">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="new-user-item">
          <label>Gender</label>
          <div className="new-user-gender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="new-user-item">
          <label>Active</label>
          <select className="new-user-select" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </form>
      <button className="new-user-button">Create</button>
    </div>
  );
}
