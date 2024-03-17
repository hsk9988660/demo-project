import Swal from "sweetalert2";

export const getToasterSuccessNotifications = (title) => {
	return Swal.fire({
		toast: true,
		icon: "",
		title: `<p> ${title} </p>`,
		background: "rgb(254 250 206)",
		animation: false,
		position: "top",
		showConfirmButton: false,
		timer: 6000,
		timerProgressBar: false,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
};