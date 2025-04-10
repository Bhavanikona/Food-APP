import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import '../List/List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async (retryCount = 0) => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error loading food list");
      }
    } catch (error) {
      if (retryCount < 3) {
        // Retry after 2 seconds
        setTimeout(() => fetchList(retryCount + 1), 2000);
      } else {
        toast.error("Failed to connect to server. Please try again later.");
        console.error("Fetch error:", error);
      }
    }
  };

  useEffect(() => {
    fetchList(); // call once on component mount
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to remove food item");
      }
    } catch (error) {
      toast.error("Network error while removing item");
      console.error("Remove error:", error);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Food Lists</p>
      <div className="list-tabel">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
