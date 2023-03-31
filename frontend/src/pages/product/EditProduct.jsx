import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Header, Button } from '../../components';
import { useStateContext } from "../../contexts/ContextProvider";


const EditProduct = () => {
    const [kodeProduk, setKodeProduk] = useState("");
    const [namaProduk, setNamaProduk] = useState("");
    const [kategori, setKategori] = useState("Makanan");
    const [stok, setStok] = useState("");
    const [expired, setExpired] = useState("");
    const [hargaBeli, setHargaBeli] = useState("");
    const [hargaJual, setHargaJual] = useState("");
    const [satuan, setSatuan] = useState("Pcs");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect (()=>{
        const getProductById = async () =>{
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            setKodeProduk(response.data.kodeProduk);
            setNamaProduk(response.data.namaProduk);
            setKategori(response.data.kategori);
            setStok(response.data.stok);
            setExpired(response.data.expired);
            setHargaBeli(response.data.hargaBeli);
            setHargaJual(response.data.hargaJual);
            setSatuan(response.data.satuan);
        }
        getProductById();
    },[id])

    const updateProduct = async (e) => {
        e.preventDefault();

        await axios.patch(`http://localhost:5000/products/${id}`,{
            kodeProduk,
            namaProduk,
            kategori,
            stok: parseInt(stok),
            expired,
            hargaBeli: parseInt(hargaBeli),
            hargaJual: parseInt(hargaJual),
            satuan
        });
        navigate("/barang")
    }
    const { currentColor } = useStateContext();
  return (
    <>
    <div className="mt-5 ml-14">
      <Header category="Halaman" title="Tambah Barang" />
    </div>
    <div className="flex flex-wrap justify-center gap-1">
      <div className="w=[95%] mt-3 mb-10 w-11/12  rounded-2xl bg-white p-4 dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={updateProduct}>
          <div className="field">
            <label
              htmlFor="namaProduk"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
            >
              Nama Produk
            </label>
            <div className="control">
              <input
                type="text"
                id="namaProduk"
                name="namaProduk"
                value={namaProduk}
                onChange={(e) => setNamaProduk(e.target.value)}
                placeholder="Masukkan Nama Produk"
                className="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="field mb-6 w-full px-3 md:mb-0 md:w-1/3 ">
              <label
                htmlFor="kodeProduk"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
              >
                Kode Produk
              </label>
              <div className="control">
                <input
                  type="text"
                  id="kodeProduk"
                  name="kodeProduk"
                  value={kodeProduk}
                  onChange={(e) => setKodeProduk(e.target.value)}
                  placeholder="Masukkan Kode Produk"
                  className="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>

            <div className="field w-full px-3 md:w-1/3">
              <label
                htmlFor="kategori"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
              >
                Kategori
              </label>
              <div className="control">
                <select
                  className="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option value="Sabun">Sabun</option>
                  <option value="Makanan">Makanan</option>
                </select>
              </div>
            </div>

            <div className="field w-full px-3 md:w-1/3">
              <label
                htmlFor="expired"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
              >
                Expired Date
              </label>
              <div className="control">
                <input
                  type="date"
                  id="expired"
                  name="expired"
                  value={expired}
                  onChange={(e) => setExpired(e.target.value)}
                  placeholder="Masukkan Expired Date"
                  className="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 mt-2 flex flex-wrap">
            <div className="field w-full px-3 md:w-1/2">
              <label
                htmlFor="hargaBeli"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
              >
                Harga Beli
              </label>
              <div className="control">
                <input
                  type="number"
                  id="hargaBeli"
                  name="hargaBeli"
                  value={hargaBeli}
                  onChange={(e) => setHargaBeli(e.target.value)}
                  placeholder="Masukkan Harga Beli/Modal"
                  className="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>

            <div className="field w-full px-3 md:w-1/2">
              <label
                htmlFor="hargaJual"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
              >
                Harga Jual
              </label>
              <div className="control">
                <input
                  type="number"
                  id="hargaJual"
                  name="hargaJual"
                  value={hargaJual}
                  onChange={(e) => setHargaJual(e.target.value)}
                  placeholder="Masukkan Harga Jual"
                  className="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 mt-2 flex flex-wrap">
            <div className="field w-full px-3 md:w-1/2">
              <label
                htmlFor="stok"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
              >
                Stok
              </label>
              <div className="control">
                <input
                  type="number"
                  id="stok"
                  name="stok"
                  value={stok}
                  placeholder="Masukkan Stok"
                  disabled class="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                 
                />
              </div>
            </div>

            <div className="field w-full px-3 md:w-1/2">
              <label
                htmlFor="satuan"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-white"
              >
                Satuan
              </label>
              <div className="control">
                <select
                  className="mb-5 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={satuan}
                  onChange={(e) => setSatuan(e.target.value)}
                >
                  <option value="Sabun">Pcs</option>
                  <option value="Makanan">Kilo</option>
                </select>
              </div>
            </div>
          </div>
            <div className="field mt-3 flex justify-end gap-2">
            <Link to={'/'}>
            <Button
              color="white"
              bgColor="red"
              text="Batal"
              borderRadius="10px"
              type="submit"
            />
              </Link>
            <Button
              color="white"
              bgColor={currentColor}
              text="Tambah"
              borderRadius="10px"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default EditProduct