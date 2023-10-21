import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const UserDetails = ({ baseUrl1 }) => {
  // Define state to manage form data

  const [userAddresses, setUserAddresses] = useState([]);
  const userId = Cookies.get("userId"); // Retrieve userId from cookies

  const fetchUserAddresses = React.useCallback(
    async (userId) => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          baseUrl1 + `Get_addresess.php?user_id=${userId}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the response data
        return data;
      } catch (error) {
        console.error("Error fetching user addresses:", error);
        return { status: false, message: "Error fetching user addresses" };
      }
    },
    [baseUrl1]
  );

  useEffect(() => {
    if (userId) {
      fetchUserAddresses(userId).then((data) => {
        if (data.status) {
          setUserAddresses(data.data);
        } else {
          setUserAddresses([]);
        }
      });
    }
  }, [userId, fetchUserAddresses]);

  return (
    <div className="text-start address-details">
      {userAddresses.map((userAddress, index) => (
        <div key={index}>
          <Card className="m-2">
            <Card.Body className="p-3">
              <div>
                <h4> Address:</h4>
                <h6>
                  {userAddress.Name},{userAddress.StreetAddress},{" "}
                  {userAddress.City},{userAddress.State}, {userAddress.ZipCode},
                  {userAddress.Contry}
                </h6>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default UserDetails;