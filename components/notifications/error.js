import Swal from "sweetalert2";

export const getToasterErrors = (title) => {
	return Swal.fire({
		toast: true,
		icon: "",
		title: `<p style=color:#fff> ${title} </p>`,
		background: "#000",
		animation: false,
		position: "bottom",
		showConfirmButton: false,
		timer: 6000,
		timerProgressBar: false,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
};