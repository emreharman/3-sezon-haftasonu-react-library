import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import Header from "../components/Header";
import Loading from "../components/Loading";

const EditCategory = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const params = useParams();
  console.log(params.categoryId);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/categories`)
      .then((res) => {
        console.log(res.data);
        setAllCategories(res.data);
        const myCategory = res.data.find(
          (item) => item.id == params.categoryId
        );
        setCategory(myCategory);
        setNewCategoryName(myCategory.name);
      })
      .catch((err) => console.log("editCategoryGetErr", err));
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    if (newCategoryName === "") {
      alert("Kategori ismi boş bırakılamaz");
      return;
    }
    const hasCategory = allCategories.find(
      (item) => item.name.toLowerCase() === newCategoryName.toLowerCase()
    );
    console.log("hasCategory", hasCategory);
    if (hasCategory !== undefined) {
      alert("Bu kategori ismi zaten mevcut");
      return;
    }
    const newCategory = {
      ...category,
      name: newCategoryName,
    };
    axios
      .put(`http://localhost:3004/categories/${category.id}`, newCategory)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "EDIT_CATEGORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => console.log("editCategoryPutErr", err));
  };

  if (allCategories === null) {
    return <Loading />;
  }
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Kategori İsmi
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
