import express from "express";
import { events } from "../mock/events.mock";
import morgan from "morgan";
import cors from "cors";
import mysql from "mysql2";
import "dotenv/config";

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: "gatwick",
	password: process.env.DB_PASSWORD,
	port: 3306,
});

connection.connect(function (err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}
	console.log("connected as id " + connection.threadId);
});

const app = express();

app.use(morgan("dev")).use(cors()).use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/events", (req, res) => {
	res.json(events);
});

app.get("/api/events/:id", (req, res) => {
	const event = events.find((e) => e.id === req.params.id);
	res.json(event);
});

const PORT = 7005;

app.listen(PORT, () => {
	console.log("Server started on port  " + PORT);
});
