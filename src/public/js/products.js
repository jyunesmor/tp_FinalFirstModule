const socket = io();

socket.on("newProduct", () => {
	window.location.reload();
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "El Producto se Creo correctamente",
		showConfirmButton: false,
		timer: 1500,
	});
});

socket.on("deleteProduct", () => {
	window.location.reload();
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "El Producto se Elimino correctamente",
		showConfirmButton: false,
		timer: 1500,
	});
});
