import crypto from "crypto";

export default function handler(req, res) {

const secret = process.env.SECRET_KEY;

const expire = Math.floor(Date.now()/1000) + 600;

const token = crypto
.createHmac("sha256", secret)
.update(String(expire))
.digest("hex");

res.status(200).json({
token,
expire
});

}
