import React, { useState, useEffect } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = new FormData();

    data.append("name", name);
    data.append("age", age);
    data.append("gender", gender);


    console.log(data);
    fetch("/rest/addUser", {
      method: "POST",
  
      body: data,
    });
  };


  useEffect(() => {
    fetch("/rest/allUsers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setResultsLoaded(true);
        console.log(data);
      });
  }, []);

  if (!resultsLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {users.map((user) => (
          <div key={user._id}>
            <p>
              Name: {user.name} - Age: {user.age}
            </p>
            <hr />
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleName}
          />
          <input
            type="text"
            placeholder="age"
            name="age"
            onChange={handleAge}
          />
          <select onChange={handleGender}>
            <option>M</option>
            <option>F</option>
          </select>
          <button type="submit">Add user</button>
        </form>
      </>
    );
  }
}
