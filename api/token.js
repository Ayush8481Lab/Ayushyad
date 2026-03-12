import crypto from "crypto";

export default function handler(req, res) {

const ref = req.headers.referer || "";

if (!ref.includes(process.env.SITE)) {
return res.status(403).send("Forbidden");
}

const expire = Math.floor(Date.now()/1000) + 600;

const token = crypto
.createHmac("sha256", process.env.SECRET_KEY)
.update(String(expire))
.digest("hex");

res.json({ token, expire });

}
