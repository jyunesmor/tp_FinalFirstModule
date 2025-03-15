const socket = io();

socket.on("newCart", () => {
	window.location.href = "/products";
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "Agregado al Carrito",
		showConfirmButton: false,
		timer: 1500,
	});
});
