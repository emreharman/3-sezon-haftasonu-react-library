import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Modal from "../components/Modal";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((resBook) => {
        console.log(resBook);
        setBooks(resBook.data);
        axios
          .get("http://localhost:3004/categories")
          .then((resCat) => {
            setCategories(resCat.data);
          })
          .catch((err) => console.log("categories err", err));
      })
      .catch((err) => console.log("books err", err));
  }, [didUpdate]);
  const kitapSil = (id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log("delete res", res);
        setDidUpdate(!didUpdate);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };
  if (books === null || categories === null) {
    return <Loading />;
  }
  return (
    <div className="container my-5">
      <div className="my-3 d-flex justify-content-end">
        <Link to="/add-book" className="btn btn-primary">
          Kitap Ekle
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Kitap Adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th className="text-center" scope="col">
              ISBN
            </th>
            <th className="text-center" scope="col">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const category = categories.find(
              (cat) => cat.id === book.categoryId
            );
            return (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{category.name}</td>
                <td className="text-center">
                  {book.isbn === "" ? "-" : book.isbn}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setShowModal(true);
                        //kitapSil(book.id);
                        setSilinecekKitap(book.id);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`edit-book/${book.id}`}
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
      {showModal === true && (
        <Modal
          aciklama="Silemk istediğinize emin misiniz?"
          title={"Silme İşlemi"}
          yapilmasiGerekenIs={() => kitapSil(silinecekKitap)}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default ListBooks;
