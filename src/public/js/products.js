const socket = io();

socket.on("newProduct", () => {
	window.location.reload();
});

socket.on("deleteProduct", () => {
	window.location.reload();
});
