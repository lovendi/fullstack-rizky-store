import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useResizeColumns,
} from "react-table";
import MOCK_Data from '../data/MOCK_Data.json'
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";



const Home = () => {
  const COLUMNS = [
    {
        Header: 'No',
        accessor: 'no',
        width: 0,
    },
    {
      Header: 'Nama Produk',
      accessor: 'nama_produk',
      width: 1000
    },
    {
      Header: 'Stok',
      accessor: 'stok',
      width: 0
  }


  ]
  
  
  
  const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_Data, [])
    
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage, 
        previousPage,
        canNextPage,
        canPreviousPage, 
        prepareRow, 
        state,
        pageOptions,
        setPageSize, 
        setGlobalFilter,
        state: { pageIndex, pageSize }
    } = useTable ({
  
        columns,
        data,
        initialState: {pageSize: 6},
        
    }, useResizeColumns,useGlobalFilter, useSortBy, usePagination)
  

  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-wrap gap-2 justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-gray-700 h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Pendapatan Hari Ini</p>
              <p className="text-2xl">Rp.500.000</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div>
        </div>

        <div className="flex mt-3 mb-3 mr-3 flex-wrap justify-center gap-4 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-gray-700 md:w-48  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-gray-700 ml-3 mt-3 mb-10 p-4 rounded-2xl md:w-760 ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Cash Flow Update</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Laba</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Modal</span>
              </p>
            </div>
          </div>
          <div className=" flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
 



            </div>
            <div className="flex">
              <Stacked currentMode={currentMode} width="720px" height="420px" />
            </div>
          </div>
        </div>




        <div className="flex gap-10 m-3 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-gray-700 p-6 mb-7 rounded-2xl md:w-96">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Stok Akan Habis</p>
          </div>
          <div className="mt-10 w-full table-layout:fixed overflow-auto shadow-md rounded-2xl">

          <table {...getTableProps()}className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
                {
                    headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                           headerGroup.headers.map( column => (
                            <th scope="col" className=" px-6 py-3" {...column.getHeaderProps({style: { width: column.width}}, column.getSortByToggleProps()) }
                            onClick={() => column.toggleSortBy(!column.isSortedDesc)}>
                            {column.render('Header')}

                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' 🔽'
                                  : ' 🔼'
                                : ''}

                          </th>
                           )) 
                        }

                    </tr>
                    ))}

            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map((row) => {
                        prepareRow(row)
                        return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " {...row.getRowProps()}>
                            {
                                row.cells.map(cell => {
                                    return <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white" {...cell.getCellProps({
                                        style: {
                                            width: cell.column.width
                                        }
                                    })}>{cell.render('Cell')}</td>
                                })
                            }
                        </tr>
                        )
                    })
                }
                
            </tbody>
            </table>
            <div className="bg-white dark:bg-gray-900 flex flex-wrap lg:flex-wrap gap-2 justify-between ">
            <span className="ml-5  text-sm font-normal text-gray-500 dark:text-gray-400">
              page{" "}
              <strong className="font-semibold text-gray-900 dark:text-white">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
              {""}
            </span>
            {/* <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {
                            [10,25,50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))
                            
                            
                        }
                    </select> */}
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <a
                  className="block px-2 py-1 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
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
                </a>
              </li>
              <li>
                <a
                  className="block px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"
                  >
                    
                    </path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          </div>

        </div>
      </div>




      </div>

{/* RECENT */}




      
    </div>
  );
};

export default Home;
