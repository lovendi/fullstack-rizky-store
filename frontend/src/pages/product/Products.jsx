import React, { useState, useEffect } from "react";
import { Button, Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProducts();
  }, [page, keyword]);

  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:5000/products?search_query=${keyword}&page${page}&limit${limit}`
    );
    setProducts(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang anda cari maka cari menggunakan kata kunci spesifik"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const { currentColor } = useStateContext();
  return (
    <>
      <div className="mt-14 ml-14  sm:mt-5">
        <Header category="Halaman" title="Produk" />
      </div>
      <div className="container flex justify-between">
        <div className="ml-14">
          <Link to={"tambah-produk"}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Tambah Produk"
              borderRadius="10px"
            />
          </Link>
        </div>
        <form onSubmit={searchData}>
          <div className="relative mr-10">
            <div className="absolute top-3 left-3">
              <i className="fa fa-search z-18 text-gray-400 hover:text-gray-500" />
            </div>
            <input
              type="text"
              className="z-0 h-12 w-96 rounded-lg border-none bg-white pl-10 pr-20 focus:shadow focus:outline-none dark:bg-gray-700 dark:text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Masukkan Kata Kunci"
            />
            <div className="control absolute top-2 right-2">
              <button
                type="submit"
                className="h-8 w-20 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="mt-10 mb-10 ml-14 mr-10">
        <div className="table-layout:fixed overflow-y-hidden rounded-2xl shadow-md">
          <Table hoverable={true} className='sm:table-fixed overflow-y-hidden'>
            <Table.Head className="bg-gray-300">
              <Table.HeadCell className="w-0">No</Table.HeadCell>
              <Table.HeadCell className="w-20">Kode Produk</Table.HeadCell>
              <Table.HeadCell className="w-64">Nama Produk</Table.HeadCell>
              <Table.HeadCell className="w-24">Kategori</Table.HeadCell>
              <Table.HeadCell className="w-20">Stok</Table.HeadCell>
              <Table.HeadCell className="w-20">Expired</Table.HeadCell>
              <Table.HeadCell className="w-20">Modal</Table.HeadCell>
              <Table.HeadCell className="w-20">Harga</Table.HeadCell>
              <Table.HeadCell className="w-20">Satuan</Table.HeadCell>
              <Table.HeadCell className="w-24">Aksi</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {products.map((product, index) => (
                <Table.Row
                  key={product.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.kodeProduk}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.namaProduk}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.kategori}
                  </Table.Cell>
                  <Table.Cell className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.stok}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.expired}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.hargaBeli}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.hargaJual}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.satuan}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/produk/edit/${product.id}`}>
                      <button className="font-medium text-blue-600 dark:text-blue-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="ml-2 font-medium text-red-600 dark:text-red-500"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="mt-2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Total Rows: {rows} {""}
              <span className="font-semibold text-gray-900 dark:text-white">
                Page: {rows ? page + 1 : 0}
              </span>
              {""} of {""}
              <span className="font-semibold text-gray-900 dark:text-white">
                Total Page: {pages}
              </span>
            </span>
          </div>
          <p className="has-text-centered has-danger-text">{msg}</p>
        </div>
        <nav
          className="mt-2 flex items-center justify-center text-center"
          key={rows}
          role="navigation"
          aria-label="Page navigation example"
        >
          <ReactPaginate
            previousLabel={
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            nextLabel={
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            pageCount={Math.min(10, pages)}
            onPageChange={changePage}
            containerClassName={"inline-flex items-center -space-x-px"}
            pageLinkClassName={""}
            previousLinkClassName={
              "block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            nextLinkClassName={
              "block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            activeLinkClassName={
              "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            }
          />
        </nav>
      </div>
    </>
  );
};

export default Products;
