document.getElementById('pdfInput').addEventListener('change', function(event) {
	const file = event.target.files[0];
	if (file && file.type === 'application/pdf') {
		const fileURL = URL.createObjectURL(file);
			document.getElementById('pdfViewer').setAttribute('src', fileURL);
	} else {
		alert('请选择一个有效的PDF文件。');
	}
});
