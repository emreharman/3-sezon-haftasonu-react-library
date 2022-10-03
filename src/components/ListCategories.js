import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";

const ListCategories = () => {
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log("booksState", booksState);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [silinecekCategory, setSilinecekCategory] = useState(null);
  const [silinecekCategoryName, setSilinecekCategoryName] = useState("");

  useEffect(() => {
    document.title = "Kitaplık - Kategoriler";
  }, []);

  const categorySil = (id) => {
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "DELETE_CATEGORY", payload: id });
        const booksHasCategory = booksState.books.filter(
          (item) => item.categoryId == id
        );
        console.log("booksHasCategory", booksHasCategory);
        booksHasCategory.map((item) =>
          dispatch({ type: "DELETE_BOOK", payload: item.id })
        );
      })
      .catch((err) => console.log("deleteCategoryErr", err));
  };

  if (categoriesState.success !== true) {
    return <Loading />;
  }

  return (
    <div className="container my-5">
      <div className="my-3 d-flex justify-content-end">
        <Link to="/add-category" className="btn btn-primary">
          Kategori Ekle
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Kategori Adı</th>
            <th className="text-center" scope="col">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          {categoriesState.categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.name}</td>

                <td className="text-center">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setShowDeleteModal(true);
                        //kitapSil(book.id);
                        setSilinecekCategory(category.id);
                        setSilinecekCategoryName(category.name);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit-category/${category.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeleteModal === true && (
        <Modal
          aciklama={`Silmek istediğinize emin misiniz?`}
          title={silinecekCategoryName}
          onConfirm={() => categorySil(silinecekCategory)}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ListCategories;
