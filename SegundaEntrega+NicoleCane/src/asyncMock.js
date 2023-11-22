const products = [
  { id: "1", name: "Attack On Titan", img: "/public/Img/OIP.jpeg", price: 1500, category: "temporada1", description: " Temp 1 Cap 1", stock: 10 },
  { id: "2", name: "Attack On Titan", img: "/public/Img/OIP (1).jpeg", price: 1500, category: "temporada1", description: "Temp 1 Cap 2", stock: 5 },
  { id: "3", name: "Attack On Titan", img: "/public/Img/OIP (5).jpeg", price: 1500, category: "temporada2 ", description: "Temp 2 Cap 1", stock: 3 },
  { id: "4", name: "Attack On Titan", img: "/public/Img/OIP (6).jpeg", price: 1500, category: "temporada2", description: "Temp 2 Cap 2", stock: 4 },
  { id: "5", name: "Attack On Titan", img: "/public/Img/OIP (2).jpeg", price:1500, category: "temporada2", description: "Temp 2 Cap 3", stock: 12},
  { id: "6", name: "Attack On Titan", img: "/public/Img/OIP (3).jpeg", price: 1500, category: "temporada3", description: "Temp 3 Cap 1", stock: 16 },
  { id: "7", name: "Attack On Titan", img: "/public/Img/OIP (4).jpeg", price: 1500, category: "temporada3", description: "Temp 3 Cap 2", stock:30 },
  { id: "8", name: "Attack On Titan", img: "/public/Img/OIP (7).jpeg", price: 1500, category: "temporada3", description: "Temp 3 Cap 3", stock: 7 },
  { id: "9", name: "Attack On Titan", img: "/public/Img/OIP (8).jpeg", price: 1500, category: "temporada4", description: "Temp 4 Cap 1", stock: 11 },
  { id: "10", name: "Attack On Titan", img: "/public/Img/OIP (9).jpeg", price: 1500, category: "temporada4", description: "Temp 4 Cap 2", stock: 6 },
];

  export const getProducts = () => {
    return new Promise((resolve, reject) => {

      if (products.length > 0) {
        setTimeout(() => {
          resolve(products);
        }, 2000);
      } else {
        reject("No hay productos");
      }
    });
  };

  export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
      if (products.length > 0) {
        const product = products.find( p => p.id === id);

        setTimeout(() => {
          if(!product) {
            reject(`No se encuentra el productos con el id ${id}`)
          }
          resolve(product);
        }, 2000);
      } else {
        reject("No hay productos");
      }
    });
  };