import React, { useState, useEffect } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);

  useEffect(() => {
    fetch("/rest/women")
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
        <h1>Women</h1>
        {users.map((user) => (
          <div key={user._id}>
            <p>
              Name: {user.name} - Age: {user.age}
            </p>
          </div>
        ))}
      </>
    );
  }
}
