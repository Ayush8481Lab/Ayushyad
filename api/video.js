import crypto from "crypto";

export default function handler(req, res) {

const ref = req.headers.referer || "";

if (!ref.includes(process.env.SITE)) {
return res.status(403).send("Blocked");
}

const { token, expire } = req.query;

if (!token || !expire) {
return res.status(403).send("Invalid");
}

if (expire < Math.floor(Date.now()/1000)) {
return res.status(403).send("Expired");
}

const valid = crypto
.createHmac("sha256", process.env.SECRET_KEY)
.update(String(expire))
.digest("hex");

if (token !== valid) {
return res.status(403).send("Bad token");
}

const url = `https://drive.google.com/file/d/${process.env.DRIVE_ID}/preview`;

res.redirect(url);

}
