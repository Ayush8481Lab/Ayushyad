import crypto from "crypto";

export default function handler(req, res) {

const { token, expire } = req.query;

const secret = process.env.SECRET_KEY;

if(!token || !expire){
return res.status(403).send("Forbidden");
}

if(expire < Math.floor(Date.now()/1000)){
return res.status(403).send("Token expired");
}

const valid = crypto
.createHmac("sha256", secret)
.update(String(expire))
.digest("hex");

if(token !== valid){
return res.status(403).send("Invalid token");
}

const id = process.env.DRIVE_ID;

const url = `https://drive.google.com/file/d/${id}/preview`;

res.json({
embed:url
});

}
