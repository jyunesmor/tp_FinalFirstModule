const socket = io();

socket.on("newProduct", () => {
	window.location.reload();
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "El Producto se Creo correctamente",
		showConfirmButton: false,
		timer: 2500,
	});
});

socket.on("deleteProduct", () => {
	window.location.reload();
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "El Producto se Elimino correctamente",
		showConfirmButton: false,
		timer: 2500,
	});
});

socket.on("codeExist", () => {
	window.location.reload();
	Swal.fire({
		position: "top-end",
		icon: "warning",
		title:
			"El Producto se encuentra en la base de datos, Ingrese otro Producto",
		showConfirmButton: false,
		timer: 2500,
	});
});

const deleteButton = document.getElementById("delete");
const elementIdInput = document.getElementById("id");

deleteButton.addEventListener("click", (e) => {
	e.preventDefault();
	const elementId = elementIdInput.value.trim();

	if (!elementId) {
		showMessage("Por favor, ingresa un ID válido", "error");
		return;
	}

	// URL de la API (reemplaza con tu URL real)
	const apiUrl = `http://localhost:8080/api/products/${elementId}`;

	console.log(apiUrl);
	// Realizar la solicitud DELETE
	fetch(apiUrl, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			showMessage(
				`Elemento con ID ${elementId} eliminado correctamente`,
				"success"
			);
			elementIdInput.value = "";
		})
		.catch((error) => {
			console.log(error.message);
		});
});
