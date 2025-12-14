import { planetApi } from "@codelab/api/planet";
import { getDB } from "@codelab/database/db";
import { env } from "@/env";

export default planetApi(getDB(env.DATABASE_URL));
