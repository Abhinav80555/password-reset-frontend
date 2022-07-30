import styles from "./styles.module.css";
import { useState,useEffect } from "react";
import { API } from "../../images/global";
import { useNavigate } from "react-router-dom";
const Main = () => {
	const navigate=useNavigate()
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [count, setCount] = useState([]);
  
	const getUsers=()=>{
		fetch(`${API}/api/users`, {
		  method: "GET",
		  headers:{
			"x-auth-token":localStorage.getItem("token"),
		  },
		}).then((response)=>{
		  if(response.status === 401){
			navigate("/login")}
		  return response;
		})
		  .then((data) => data.json())
		  .then((dr) =>setCount(dr));
	  }
	  
		useEffect(() =>getUsers(),[]);

		const deleteUser = (id) => {
			fetch(`${API}/api/users/${id}`, { method: "DELETE" })
			  .then(() => getUsers())
		  };
		  const Delete={
			marginLeft: "auto",
			color:"red"
		  }

	return (
		<>
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Task forgot password  -  and  -  URL Shotener</h1>
 				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
		{count.map((dr) => (
          <Cards
            key={dr._id}
            user={dr}
            id={dr._id}
            {...dr}

			deleteButton={
				<button
				  style={{Delete}}
				  onClick={() => deleteUser(dr._id)}
				>
				  <b>Delete</b>
				</button>
			  }
			
			/> ))
		}
		</>
	);
};


function Cards({user,deleteButton}){
	return(
		<>
		<div className="container mt-5">       
			<div className="row">
            <div className="col-lg-4">
                <div className="card border-secondary mb-3" style={{maxWidth:"100%"}}>
                    <div className="card-header"><u><h4>Email-Id</h4></u><span>{user.email}</span></div>
                    <div className="card-body text-secondary">
                        <h6 className="card-title">
						User Name : {user.firstName} {user.lastName}
                        </h6>
						<ul>  
					    <li className="card-text">
							Signup Count : {user.clickCountSignup}
						</li> 
						<li className="card-text">
							User Login Count     : {user.clickCountLogin}
						</li>
						<li className="card-text">Password Reset Count : {user.clickCountReset}</li>
						</ul>
                      {deleteButton}
                    </div>
                </div>
            </div>
        </div>
    </div>
		</>
	)
}

export default Main;