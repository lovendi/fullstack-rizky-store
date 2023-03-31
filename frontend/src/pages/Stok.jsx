import React, { useMemo } from "react";
import Data_Stok from "../data/Data_Stok.json";
import {Header, Button} from "../components";
import {Link} from 'react-router-dom'
import { Table } from "flowbite-react";
import ReactPaginate from "react-paginate";
import { useStateContext } from "../contexts/ContextProvider";




const Stok = () => {
  const { currentColor } = useStateContext();
  const stocks = useMemo(() => Data_Stok, []);


  return (
    <>
    <div className="mt-5 ml-14">
    <Header category="Halaman" title="Stok" />
    </div>
    <div className="container flex justify-between">
        <div className="ml-14">
          <Link to={"tambah-produk"}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Tambah Stok Produk"
              borderRadius="10px"
            />
          </Link>
        </div>
        <form>
          <div className="relative mr-10">
            <div className="absolute top-3 left-3">
              <i className="fa fa-search z-18 text-gray-400 hover:text-gray-500" />
            </div>
            <input
              type="text"
              className="z-0 h-12 w-96 rounded-lg border-none bg-white pl-10 pr-20 focus:shadow focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan Kata Kunci"
            />
            <div className="control absolute top-2 right-2">
              <button
                type="submit"
                className="h-8 w-20 rounded-lg bg-blue-500 text-white"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="mt-10 mb-10 ml-14 mr-10">
        <div className="table-layout:auto overflow-y-hidden rounded-2xl shadow-md">
          <Table hoverable={true} className="sm:table-fixed overflow-y-hidden">
            <Table.Head className="bg-gray-300">
              <Table.HeadCell className="w-0">No</Table.HeadCell>
              <Table.HeadCell className="w-20">Kode Produk</Table.HeadCell>
              <Table.HeadCell className="w-64">Nama Produk</Table.HeadCell>
              <Table.HeadCell className="w-20">Tanggal Masuk</Table.HeadCell>
              <Table.HeadCell className="w-32 ">Supplier</Table.HeadCell>
              <Table.HeadCell className="w-20">Jumlah Masuk</Table.HeadCell>
              <Table.HeadCell className="w-20">Satuan</Table.HeadCell>
              <Table.HeadCell className="w-24">Aksi</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {stocks.map((stock, index) => (
                <Table.Row
                  key={stock.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {stock.kode_produk}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {stock.nama_produk}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {stock.tgl_masuk}
                  </Table.Cell>
                  <Table.Cell className="break-words font-medium text-gray-900 dark:text-white">
                    {stock.supplier}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {stock.jumlah_masuk}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {stock.satuan}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/barang/edit/`}>
                      <button className="font-medium text-blue-600 dark:text-blue-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => ('')}
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
              Total Rows:  {""}
              <span className="font-semibold text-gray-900 dark:text-white">
                Page: 
              </span>
              {""} of {""}
              <span className="font-semibold text-gray-900 dark:text-white">
                Total Page: 
              </span>
            </span>
          </div>
          <p className="has-text-centered has-danger-text"></p>
        </div>
        <nav
          className="mt-2 flex items-center justify-center text-center"
          key={''}
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
            pageCount={Math.min(10)}
            onPageChange={''}
            containerClassName={"inline-flex items-center -space-x-px"}
            pageLinkClassName={"px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
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

export default Stok;
