import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import mail from "./assets/mail.svg";
import phone from "./assets/phone.svg";
import map from "./assets/map.svg";
import man from "./assets/man.svg";
import woman from "./assets/woman.svg";
import ageWoman from "./assets/ageWoman.svg";
import ageMan from "./assets/ageMan.svg";
import padlock from "./assets/padlock.svg";

function App() {
  const [user, setUser] = useState();
  const [addUserTable, setAddUserTable] = useState([]);

  const axiosFunc = () => {
    axios.get("https://randomuser.me/api/").then((res) => {
      const data = res.data.results[0];
      console.log(data);
      setUser(data);
    });
  };

  useEffect(() => {
    axiosFunc();
  }, []);

  const hoverData = {
    name: {
      p: "My name is",
      h: user?.name.first + " " + user?.name.last,
    },
    email: {
      p: "my email is",
      h: user?.email,
    },
    age: {
      p: "My age is",
      h: user?.dob.age,
    },
    city: {
      p: "My street is",
      h: user?.location.street.number + " " + user?.location.street.name,
    },
    phone: {
      p: "My phone is",
      h: user?.phone,
    },
    password: {
      p: "My password is",
      h: user?.login.password,
    },
  };

  const onMauseOver = (e) => {
    e.target.parentElement.previousSibling.firstElementChild.innerText =
      Object.entries(hoverData)[e.target.id][1].p;
    e.target.parentElement.previousSibling.lastElementChild.innerText =
      Object.entries(hoverData)[e.target.id][1].h;
  };

  const handleClickRandom = (e) => {
    axiosFunc();
    e.target.nextSibling.disabled = false;
  };

  const newRow = {
    name: user?.name.first + " " + user?.name.last,
    email: user?.email,
    age: user?.dob.age,
    phone: user?.phone,
  };

  const handleClickAddUser = (e) => {
    setAddUserTable([...addUserTable, newRow]);
    e.target.disabled = true;
  };

  return (
    <main>
      <figure>
        <img alt="" src={user?.picture.large} />
      </figure>

      <section className="hoverDeployResult">
        <p>My name is</p>
        <h3>{user?.name.first + " " + user?.name.last}</h3>
      </section>
      <section className="hoverDeployImg">
        <img
          src={user?.gender === "female" ? woman : man}
          alt=""
          id="0"
          onMouseOver={(e) => onMauseOver(e)}
        />
        <img src={mail} alt="" id="1" onMouseOver={(e) => onMauseOver(e)} />
        <img
          src={user?.gender === "female" ? ageWoman : ageMan}
          alt=""
          id="2"
          onMouseOver={(e) => onMauseOver(e)}
        />
        <img src={map} alt="" id="3" onMouseOver={(e) => onMauseOver(e)} />
        <img src={phone} alt="" id="4" onMouseOver={(e) => onMauseOver(e)} />
        <img src={padlock} alt="" id="5" onMouseOver={(e) => onMauseOver(e)} />
      </section>
      <section className="buttons">
        <button onClick={(e) => handleClickRandom(e)}>RANDOM USER</button>
        <button onClick={(e) => handleClickAddUser(e)}>ADD USER</button>
      </section>
      <section className="addUserList">
        {addUserTable.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {addUserTable?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </section>
    </main>
  );
}

export default App;
