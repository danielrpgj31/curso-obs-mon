const express = require("express");
const serviceDb = require("./service");

const app = express();
const port = 3000;

serviceDb.gcFilePersisteDb();
