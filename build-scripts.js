const fs = require("fs-extra");
const concat = require("concat");

async function buildScripts() {
	// Reading data from index file & Creating vendor file
	let fileData = "";

	fs.readFile("./build/index.html", async (err, buf) => {
		if (err) {
			console.log("Some Error while reading file", err);
			return;
		} else {
			fileData += buf.toString();

			const start = fileData.indexOf("<script>") + 8;
			const end = fileData.indexOf("</script>");
			console.log("Start: ", start, "End: ", end);

			let vendorData = fileData.substr(start, end - start);
			await fs.writeFile("build/static/js/vendor.js", vendorData, async err => {
				if (err) {
					await console.log("There is some error creating vendor file.");
					return;
				}
				await console.log("Vendor File created successfully");
			});
		}
	});

	fs.readdir("build/static/js", (err, files) => {
		if (err) {
			console.log("Error reading build js files", err);
			return;
		}
		console.log("Files are: ", files);

		let number = 1;
		files.forEach(file => {
			let fName = file;
			if (fName.includes(".js") && !fName.includes(".map")) {
				console.log("Js: ", file);

				if (fName.includes("main") && fName.includes("runtime")) {
					const oldName = `./build/static/js/${fName}`;
					const newName = `./build/static/js/main-runtime.js`;
					fs.rename(oldName, newName, err => {
						if (err) {
							console.log("Some error While renaming main file");
							return;
						}
						console.log("Main runtime: File renamed successfully.");
					});
				} else if (fName.includes("main")) {
					const oldName = `./build/static/js/${fName}`;
					const newName = `./build/static/js/main.js`;
					fs.rename(oldName, newName, err => {
						if (err) {
							console.log("Some error While renaming main file");
							return;
						}
						console.log("Main: File renamed successfully.");
					});
				} else {
					const oldName = `./build/static/js/${fName}`;
					const newName = `./build/static/js/chunk.${number}.js`;
					fs.rename(oldName, newName, err => {
						if (err) {
							console.log("Some error While renaming main file");
							return;
						}
						console.log(`chunk${number} runtime: File renamed successfully.`);
					});
				}
			}
		});
	});
}

async function buildStyles() {
	fs.readdir("build/static/css", (err, files) => {
		if (err) {
			console.log("Error reading build CSS files", err);
			return;
		}
		console.log("CSS Files are: ", files);

		let number = 1;
		files.forEach(file => {
			let fName = file;
			if (fName.includes(".css") && !fName.includes(".map")) {
				console.log("CSS: ", file);

				if (fName.includes("main") && fName.includes("runtime")) {
					const oldName = `./build/static/css/${fName}`;
					const newName = `./build/static/css/main-runtime.css`;
					fs.rename(oldName, newName, err => {
						if (err) {
							console.log("Some error While renaming main file CSS");
							return;
						}
						console.log("Main runtime CSS: File renamed successfully.");
					});
				} else if (fName.includes("main")) {
					const oldName = `./build/static/css/${fName}`;
					const newName = `./build/static/css/main.css`;
					fs.rename(oldName, newName, err => {
						if (err) {
							console.log("Some error While renaming main CSS file");
							return;
						}
						console.log("Main CSS: File renamed successfully.");
					});
				} else {
					const oldName = `./build/static/css/${fName}`;
					const newName = `./build/static/css/chunk.${number}.css`;
					fs.rename(oldName, newName, err => {
						if (err) {
							console.log("Some error While renaming CSS main file");
							return;
						}
						console.log(
							`CSS chunk${number} runtime: File renamed successfully.`
						);
					});
				}
			}
		});
	});

	// Reading data from index file & Creating vendor file
}

(async function build() {
	// Rename Files first
	await buildScripts();
	await buildStyles();

	setTimeout(async () => {
		const files = [
			"./build/static/js/vendor.js",
			"./build/static/js/main.js",
			"./build/static/js/chunk.1.js"
		];

		await fs.ensureDir("react-elements");

		await concat(files, "./main-app/ms-locations.js");
		console.info("React Files concated successfully");

		// For copying file

		// fs.copy("./build/static/styles/styles.css", "./main-app/styles.css")
		//   .then(() => console.log("Css Files copied as well.success!"))
		//   .catch(err => console.error("could not copy the css file", err));
	}, 3000);
})();
