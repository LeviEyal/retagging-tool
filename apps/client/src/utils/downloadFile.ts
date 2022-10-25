export const downloadJsonFile = (data: object, fileName: string) => {
	const element = document.createElement("a");
	const file = new Blob([JSON.stringify(data)], {
		type: "application/json"
	});
	element.href = URL.createObjectURL(file);
	element.download = fileName;
	document.body.appendChild(element); // Required for this to work in FireFox
	element.click();
};
