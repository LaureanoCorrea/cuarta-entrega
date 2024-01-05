function setupSocket() {
  const socket = io();

  socket.on("updateProductsList", (updatedProducts) => {
      console.log(updatedProducts);
      const productList = document.getElementById("productList");
      productList.innerHTML = "";

      updatedProducts.forEach((product) => {
          const listItem = document.createElement("li");
          listItem.textContent = product.title;
          productList.appendChild(listItem);
      });
  });
}

setupSocket();