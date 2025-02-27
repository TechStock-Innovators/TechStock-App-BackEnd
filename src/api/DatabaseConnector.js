import { createPool } from "mysql2";

import DBCfg from "../config/db.js"

const pool = createPool(DBCfg)

export default pool