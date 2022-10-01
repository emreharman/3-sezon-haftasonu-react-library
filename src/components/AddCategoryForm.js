import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategoryForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const { categoriesState } = useSelector((state) => state);
  useEffect(() => {
    document.title = "Kitaplık - Kategori Ekle";
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoryName === "") {
      alert("Kategori ismi boş bırakılamaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (hasCategory !== undefined) {
      alert("Bu kategori zaten kayıtlıdır");
      return;
    }
    const newCategory = {
      id: new Date().getTime(),
      name: categoryName[0].toUpperCase() + categoryName.substring(1),
    };
    axios
      .post("http://localhost:3004/categories", newCategory)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "ADD_CATEGORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => console.log("addCategoryErr", err));
  };
  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Kategori İsmi
          </label>
          <input
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
